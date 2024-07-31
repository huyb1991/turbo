//! Web UI for Turborepo. Creates a WebSocket server that can be subscribed to
//! by a web client to display the status of tasks.

use std::io::Write;

use axum::{
    extract::{
        ws::{Message, WebSocket},
        State, WebSocketUpgrade,
    },
    http::Method,
    response::IntoResponse,
    routing::get,
    Router,
};
use serde::Serialize;
use thiserror::Error;
use tower_http::cors::{Any, CorsLayer};
use tracing::log::warn;

use crate::{
    sender::{TaskSender, UISender},
    tui::event::{CacheResult, Event, OutputLogs, TaskResult},
};

#[derive(Debug, Error)]
pub enum Error {
    #[error("failed to start websocket server")]
    Server(#[from] std::io::Error),
    #[error("failed to start websocket server: {0}")]
    WebSocket(#[source] axum::Error),
}

#[derive(Clone)]
pub struct WebUISender {
    pub tx: tokio::sync::broadcast::Sender<WebUIEvent>,
}

impl UISender for WebUISender {
    type Error = std::io::Error;

    fn start_task(&self, task: String, output_logs: OutputLogs) {
        self.tx
            .send(WebUIEvent::StartTask { task, output_logs })
            .ok();
    }

    fn end_task(&self, task: String, result: TaskResult) {
        self.tx.send(WebUIEvent::EndTask { task, result }).ok();
    }

    fn status(&self, task: String, status: String, result: CacheResult) {
        self.tx
            .send(WebUIEvent::Status {
                task,
                status,
                result,
            })
            .ok();
    }

    fn set_stdin(&self, task: String, stdin: Box<dyn Write + Send>) {
        warn!("stdin is not supported (yet) in web ui");
    }

    fn task(&self, task: String) -> TaskSender<Self>
    where
        Self: Sized,
    {
        TaskSender {
            name: task,
            handle: self.clone(),
            logs: Default::default(),
        }
    }

    fn stop(&self) {
        self.tx.send(WebUIEvent::Stop).ok();
    }

    fn update_tasks(&self, tasks: Vec<String>) -> Result<(), Self::Error> {
        self.tx
            .send(WebUIEvent::UpdateTasks { tasks })
            .map_err(|_| std::io::Error::new(std::io::ErrorKind::BrokenPipe, "WebUI is closed"))?;

        Ok(())
    }

    fn output(&self, task: String, output: Vec<u8>) -> Result<(), Self::Error> {
        self.tx
            .send(WebUIEvent::TaskOutput { task, output })
            .map_err(|_| std::io::Error::new(std::io::ErrorKind::BrokenPipe, "WebUI is closed"))?;

        Ok(())
    }
}

// Specific events that the websocket server can send to the client,
// not all the `Event` types from the TUI
#[derive(Debug, Clone, Serialize)]
pub enum WebUIEvent {
    StartTask {
        task: String,
        output_logs: OutputLogs,
    },
    TaskOutput {
        task: String,
        output: Vec<u8>,
    },
    EndTask {
        task: String,
        result: TaskResult,
    },
    Status {
        task: String,
        status: String,
        result: CacheResult,
    },
    UpdateTasks {
        tasks: Vec<String>,
    },
    Stop,
}

struct AppState {
    rx: tokio::sync::broadcast::Receiver<WebUIEvent>,
}

impl Clone for AppState {
    fn clone(&self) -> Self {
        Self {
            rx: self.rx.resubscribe(),
        }
    }
}

async fn handler(ws: WebSocketUpgrade, State(state): State<AppState>) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}

async fn handle_socket(mut socket: WebSocket, state: AppState) {
    let mut state = state.clone();
    while let Ok(event) = state.rx.recv().await {
        let message_payload = serde_json::to_string(&event).unwrap();
        if socket.send(Message::Text(message_payload)).await.is_err() {
            // client disconnected
            return;
        }
    }
}

pub async fn start_ws_server(
    rx: tokio::sync::broadcast::Receiver<WebUIEvent>,
) -> Result<(), Error> {
    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any);

    let app = Router::new()
        .route("/ws", get(handler))
        .layer(cors)
        .with_state(AppState { rx });

    let listener = tokio::net::TcpListener::bind("127.0.0.1:1337").await?;
    println!("Web UI listening on port 1337");
    axum::serve(listener, app).await?;

    Ok(())
}
