import React from "react";
import * as React18DOM from "react-dom/client";
import * as React17DOM from "react-dom";
import { LogWithState } from "./LogWithState";
import { LogWithoutState } from "./LogWithoutState";

const react18Root = React18DOM.createRoot(
  document.getElementById("react18-root") as HTMLElement
);

const render = (message: string, logNumber: number, messages: string[]) => {
  React17DOM.render(
    <React.StrictMode>
      <LogWithState
        log={{
          message,
          number: logNumber,
          title: "LogWithState - React 17",
          subtitle: "all prop updates render in Safari",
        }}
      />
    </React.StrictMode>,
    document.getElementById("react17-root")
  );
  react18Root.render(
    <React.StrictMode>
      <LogWithState
        log={{
          message,
          number: logNumber,
          title: "LogWithState - React 18",
          subtitle: "missing prop update renders in Safari",
        }}
      />
      <LogWithoutState
        log={{
          messages,
          title: "LogWithoutState - React 18",
          subtitle: "bug workaround for React 18 in Safari",
        }}
      />
    </React.StrictMode>
  );
};

let logNumber = 0;
// In order to fix this bug/misunderstanding in React 18, instead of using useState, we can keep
// the array of all the log messages outside of React and pass them all in on every render call
let messages: string[] = [];
const renderLog = () => {
  const message = "message #" + logNumber;
  messages.push(message);
  render(message, logNumber++, messages);
  if (logNumber < 10) {
    // Pretend that each of these timeout calls to renderLog are messages being sent from the Game
    // server to the front end. Sometimes these messages get sent in quick succession.
    setTimeout(renderLog, Math.random());
  }
};

renderLog();
