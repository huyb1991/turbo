//! Web UI for Turborepo. Creates a WebSocket server that can be subscribed to
//! by a web client to display the status of tasks.

use axum::{
    extract::{
        ws::{Message, WebSocket},
        State, WebSocketUpgrade,
    },
    response::IntoResponse,
    routing::get,
    Router,
};
use serde::Serialize;
use thiserror::Error;

use crate::tui::event::{CacheResult, Event, OutputLogs, TaskResult};

#[derive(Debug, Error)]
pub enum Error {
    #[error("failed to start websocket server")]
    Server(#[from] std::io::Error),
    #[error("failed to start websocket server: {0}")]
    WebSocket(#[source] axum::Error),
}

pub struct WebUISender {
    pub tx: tokio::sync::broadcast::Sender<WebUIEvent>,
}

// Specific events that the websocket server can send to the client,
// not all the `Event` types from the TUI
#[derive(Debug, Clone, Serialize)]
enum WebUIEvent {
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
}

impl WebUIEvent {
    fn from_event(event: Event) -> Option<Self> {
        match event {
            Event::StartTask { task, output_logs } => {
                Some(WebUIEvent::StartTask { task, output_logs })
            }
            Event::TaskOutput { task, output } => Some(WebUIEvent::TaskOutput { task, output }),
            Event::EndTask { task, result } => Some(WebUIEvent::EndTask { task, result }),
            Event::Status {
                task,
                status,
                result,
            } => Some(WebUIEvent::Status {
                task,
                status,
                result,
            }),
            Event::UpdateTasks { tasks } => Some(WebUIEvent::UpdateTasks { tasks }),
            _ => None,
        }
    }
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
    let app = Router::new()
        .route("/ws", get(handler))
        .with_state(AppState { rx });

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app).await?;

    Ok(())
}
