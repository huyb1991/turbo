use std::{
    io::Write,
    sync::{Arc, Mutex},
};

use crate::tui::event::{CacheResult, OutputLogs, TaskResult};

/// Trait to abstract over sending events to either the TUI or the Web UI
pub trait UISender: Clone + Send + Sync + 'static {
    type Error;
    fn start_task(&self, task: String, output_logs: OutputLogs);
    fn end_task(&self, task: String, result: TaskResult);

    fn status(&self, task: String, status: String, result: CacheResult);
    fn set_stdin(&self, task: String, stdin: Box<dyn std::io::Write + Send>);

    fn output(&self, task: String, output: Vec<u8>) -> Result<(), Self::Error>;

    /// Construct a sender configured for a specific task
    fn task(&self, task: String) -> TaskSender<Self>
    where
        Self: Sized;
    fn stop(&self);
    fn update_tasks(&self, tasks: Vec<String>) -> Result<(), Self::Error>;
}

#[derive(Debug, Clone)]
pub struct TaskSender<T> {
    pub(crate) name: String,
    pub(crate) handle: T,
    pub(crate) logs: Arc<Mutex<Vec<u8>>>,
}

impl<T: UISender> TaskSender<T> {
    /// Access the underlying AppSender
    pub fn as_app(&self) -> &T {
        &self.handle
    }

    /// Mark the task as started
    pub fn start(&self, output_logs: OutputLogs) {
        self.handle.start_task(self.name.clone(), output_logs);
    }

    /// Mark the task as finished
    pub fn succeeded(&self, is_cache_hit: bool) -> Vec<u8> {
        if is_cache_hit {
            self.finish(TaskResult::CacheHit)
        } else {
            self.finish(TaskResult::Success)
        }
    }

    /// Mark the task as finished
    pub fn failed(&self) -> Vec<u8> {
        self.finish(TaskResult::Failure)
    }

    fn finish(&self, result: TaskResult) -> Vec<u8> {
        self.handle.end_task(self.name.clone(), result);
        self.logs.lock().expect("logs lock poisoned").clone()
    }

    pub fn set_stdin(&self, stdin: Box<dyn std::io::Write + Send>) {
        self.handle.set_stdin(self.name.clone(), stdin);
    }

    pub fn status(&self, status: &str, result: CacheResult) {
        // Since this will be rendered via ratatui we any ANSI escape codes will not be
        // handled.
        // TODO: prevent the status from having ANSI codes in this scenario
        let status = console::strip_ansi_codes(status).into_owned();
        self.handle.status(self.name.clone(), status, result);
    }
}
