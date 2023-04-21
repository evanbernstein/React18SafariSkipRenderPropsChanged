import React from "react";

interface LogProp {
  messages: string[];
  title: string;
  subtitle: string;
}
export const LogWithoutState: React.FC<{ log: LogProp }> = ({ log }) => {
  const { messages, title, subtitle } = log;
  return (
    <>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </>
  );
};
