//! Web UI for Turborepo. Creates a WebSocket server that can be subscribed to
//! by a web client to display the status of tasks.

use std::{collections::HashSet, io::Write};

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
use serde::{Deserialize, Serialize};
use thiserror::Error;
use tokio::select;
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
    #[error("failed to serialize message: {0}")]
    Serde(#[from] serde_json::Error),
    #[error("failed to send message")]
    Send(#[from] axum::Error),
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
#[serde(tag = "type", content = "payload")]
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

#[derive(Debug, Clone, Serialize)]
pub struct ServerMessage<'a> {
    pub id: u32,
    #[serde(flatten)]
    pub payload: &'a WebUIEvent,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "payload")]
pub enum ClientMessage {
    /// Acknowledges the receipt of a message.
    /// If we don't receive an ack, we will resend the message
    Ack { id: u32 },
    /// Asks for all messages from the given id onwards
    CatchUp { start_id: u32 },
}

struct AppState {
    rx: tokio::sync::broadcast::Receiver<WebUIEvent>,
    acks: HashSet<u32>,
    messages: Vec<(WebUIEvent, u32)>,
    current_id: u32,
}

impl Clone for AppState {
    fn clone(&self) -> Self {
        Self {
            rx: self.rx.resubscribe(),
            acks: self.acks.clone(),
            messages: self.messages.clone(),
            current_id: self.current_id,
        }
    }
}

async fn handler(ws: WebSocketUpgrade, State(state): State<AppState>) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}

async fn handle_socket(socket: WebSocket, state: AppState) {
    if let Err(e) = handle_socket_inner(socket, state).await {
        warn!("error handling socket: {e}");
    }
}

async fn handle_socket_inner(mut socket: WebSocket, state: AppState) -> Result<(), Error> {
    let mut state = state.clone();
    let mut interval = tokio::time::interval(std::time::Duration::from_millis(100));
    loop {
        select! {
            biased;
            Ok(event) = state.rx.recv() => {
                let id = state.current_id;
                state.current_id += 1;
                let message_payload = serde_json::to_string(&ServerMessage {
                    id,
                    payload: &event
                })?;

                state.messages.push((event, id));
                println!("1");
                socket.send(Message::Text(message_payload)).await?;
            }
            // Every 100ms, check if we need to resend any messages
            _ = interval.tick() => {
                for (event, id) in &state.messages {
                    if !state.acks.contains(&id) {
                        let message_payload = serde_json::to_string(event).unwrap();
                        println!("2");
                        socket.send(Message::Text(message_payload)).await?;
                    }
                };
            }
            message = socket.recv() => {
                if let Some(Ok(message)) = message {
                    let message_payload = message.into_text()?;
                    if message_payload.is_empty() {
                        continue;
                    }
                    if let Ok(event) = serde_json::from_str::<ClientMessage>(&message_payload) {
                        match event {
                            ClientMessage::Ack { id } => {
                                state.acks.insert(id);
                            }
                            ClientMessage::CatchUp { start_id } => {
                                // TODO: implement
                            }
                        }
                    } else {
                        warn!("failed to deserialize message from client: {message_payload}");
                    }
                }
            },
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
        .with_state(AppState {
            rx,
            acks: HashSet::new(),
            messages: Vec::new(),
            current_id: 0,
        });

    let listener = tokio::net::TcpListener::bind("127.0.0.1:1337").await?;
    println!("Web UI listening on port 1337");
    axum::serve(listener, app).await?;

    Ok(())
}
