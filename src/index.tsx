import React from "react";
import ReactDOM from "react-dom/client";
import { LogWithState } from "./LogWithState";
import { LogWithoutState } from "./LogWithoutState";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const render = (message: string, logNumber: number, messages: string[]) => {
  root.render(
    <React.StrictMode>
      <LogWithState
        log={{
          message,
          number: logNumber,
          title:
            "LogWithState - React 18, missing prop update renders in Safari",
        }}
      />
      <LogWithoutState
        log={{
          messages,
          title: "LogWithoutState - bug workaround for React 18 in Safari",
        }}
      />
    </React.StrictMode>
  );
};

let logNumber = 0;
let messages: string[] = [];
const renderLog = () => {
  const message = "message #" + logNumber;
  messages.push(message);
  render(message, logNumber++, messages);
  if (logNumber < 25) {
    setTimeout(renderLog, Math.random());
  }
};

renderLog();
