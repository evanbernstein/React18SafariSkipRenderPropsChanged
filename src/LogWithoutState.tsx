import React from "react";

interface LogProp {
  messages: string[];
  title: string;
}
export const LogWithoutState: React.FC<{ log: LogProp }> = ({ log }) => {
  const { messages, title } = log;
  return (
    <>
      <h1>{title}</h1>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </>
  );
};
