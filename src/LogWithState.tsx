import React from "react";

interface LogProp {
  message: string;
  number: number;
  title: string;
}
export const LogWithState: React.FC<{ log: LogProp }> = ({ log }) => {
  const { message, number, title } = log;
  const [prevMessages, setMessages] = React.useState<string[]>([]);
  const [prevNumber, setNumber] = React.useState(-1);
  const messages = [];
  if (number !== prevNumber && number !== prevNumber + 1) {
    const errorMessage =
      "MISSING LOGS: prevNumber " + prevNumber + " number " + number;
    messages.push(errorMessage);
  }
  messages.push(message);
  if (number !== prevNumber) {
    const newMessages = prevMessages.concat(messages);
    setMessages(newMessages);
    setNumber(number);
  }
  return (
    <>
      <h1>{title}</h1>
      <div>
        {prevMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </>
  );
};
