use std::{sync::mpsc, time::Instant};

use super::{
    event::{CacheResult, OutputLogs},
    Event, TaskResult,
};
use crate::sender::{TaskSender, UISender};

/// Struct for sending app events to TUI rendering
#[derive(Debug, Clone)]
pub struct AppSender {
    primary: mpsc::Sender<Event>,
}

/// Struct for receiving app events
pub struct AppReceiver {
    primary: mpsc::Receiver<Event>,
}

impl AppSender {
    /// Create a new channel for sending app events.
    ///
    /// AppSender is meant to be held by the actual task runner
    /// AppReceiver should be passed to `crate::tui::run_app`
    pub fn new() -> (Self, AppReceiver) {
        let (primary_tx, primary_rx) = mpsc::channel();
        (
            Self {
                primary: primary_tx,
            },
            AppReceiver {
                primary: primary_rx,
            },
        )
    }
}

impl UISender for AppSender {
    fn start_task(&self, task: String, output_logs: OutputLogs) {
        self.primary
            .send(Event::StartTask { task, output_logs })
            .ok();
    }

    fn end_task(&self, task: String, result: TaskResult) {
        self.primary.send(Event::EndTask { task, result }).ok();
    }

    fn status(&self, task: String, status: String, result: CacheResult) {
        self.primary
            .send(Event::Status {
                task,
                status,
                result,
            })
            .ok();
    }

    fn set_stdin(&self, task: String, stdin: Box<dyn std::io::Write + Send>) {
        self.primary.send(Event::SetStdin { task, stdin }).ok();
    }

    /// Construct a sender configured for a specific task
    fn task(&self, task: String) -> TaskSender<Self> {
        TaskSender {
            name: task,
            handle: self.clone(),
            logs: Default::default(),
        }
    }

    /// Stop rendering TUI and restore terminal to default configuration
    fn stop(&self) {
        let (callback_tx, callback_rx) = mpsc::sync_channel(1);
        // Send stop event, if receiver has dropped ignore error as
        // it'll be a no-op.
        self.primary.send(Event::Stop(callback_tx)).ok();
        // Wait for callback to be sent or the channel closed.
        callback_rx.recv().ok();
    }

    type Error = mpsc::SendError<Event>;

    /// Update the list of tasks displayed in the TUI
    fn update_tasks(&self, tasks: Vec<String>) -> Result<(), Self::Error> {
        self.primary.send(Event::UpdateTasks { tasks })
    }

    fn output(&self, task: String, output: Vec<u8>) -> Result<(), Self::Error> {
        self.primary.send(Event::TaskOutput { task, output })
    }
}

impl AppReceiver {
    /// Receive an event, producing a tick event if no events are rec eived by
    /// the deadline.
    pub fn recv(&self, deadline: Instant) -> Result<Event, mpsc::RecvError> {
        match self.primary.recv_deadline(deadline) {
            Ok(event) => Ok(event),
            Err(mpsc::RecvTimeoutError::Timeout) => Ok(Event::Tick),
            Err(mpsc::RecvTimeoutError::Disconnected) => Err(mpsc::RecvError),
        }
    }
}

impl<U: UISender> std::io::Write for TaskSender<U> {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        let task = self.name.clone();
        {
            self.logs
                .lock()
                .expect("log lock poisoned")
                .extend_from_slice(buf);
        }

        self.handle
            .output(task, buf.to_vec())
            .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "receiver dropped"))?;
        Ok(buf.len())
    }

    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}
