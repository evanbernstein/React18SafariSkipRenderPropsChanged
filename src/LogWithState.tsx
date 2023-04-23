import React from "react";

interface LogProp {
  message: string;
  number: number;
  title: string;
  subtitle: string;
}
export const LogWithState: React.FC<{ log: LogProp }> = ({ log }) => {
  const { message, number, title, subtitle } = log;
  const [prevMessages, setMessages] = React.useState<string[]>([]);
  const [prevNumber, setNumber] = React.useState(-1);
  if (number !== prevNumber) {
    const newMessages = prevMessages.concat(message);
    setMessages(newMessages);
    setNumber(number);
  }
  return (
    <>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div>
        {prevMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </>
  );
};
