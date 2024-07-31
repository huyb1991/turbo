"use client";

import { useEffect, useState } from "react";
import Ansi from "ansi-to-react";

export default function TaskLogs() {
  const [logs, setLogs] = useState<{ [s: string]: string }>({});
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:1337/ws");
    const textDecoder = new TextDecoder();

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const byteArray = new Uint8Array(data.TaskOutput.output);
      const rawLogs = textDecoder.decode(byteArray);

      if (data.TaskOutput) {
        setLogs((logs) => {
          return {
            ...logs,
            [data.TaskOutput.task]:
              (logs[data.TaskOutput.task] ?? "") + rawLogs,
          };
        });
      }
    };
    return () => {
      socket.close();
    };
  }, [setLogs]);

  return (
    <div>
      <h1>Task Logs</h1>
      {Object.entries(logs).map(([taskName, taskLogs]) => (
        <div key={taskName}>
          <h1>{taskName}</h1>
          <Ansi className="whitespace-pre-wrap">{taskLogs}</Ansi>
        </div>
      ))}
    </div>
  );
}
