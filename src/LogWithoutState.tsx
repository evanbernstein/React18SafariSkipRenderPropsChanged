import React from "react";

interface LogProp {
  messages: string[];
}
export const LogWithoutState: React.FC<{ log: LogProp }> = ({ log }) => {
  const { messages } = log;
  return (
    <>
      <h1>LogWithoutState</h1>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </>
  );
};
