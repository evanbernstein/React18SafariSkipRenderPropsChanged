# Potential Bug in React 18 with Safari

This is either a demonstration of a bug with React 18 (18.2.0) in Safari, or a demonstration of
how I don't quite understand React rendering.

It seems that React 18 in Safari is not always rendering every render call, even if the props have
changed. Is this a bug?

This is a very small portion of a React/Typescript/Python game that I've been coding. This is a
very trimmed down demonstration of the bug.

The game displays a text log of the players' actions. These messages get sent from the server,
usually one at a time. Sometimes these messages arrive in quick succession, ms apart. I don't have
the game server send all of the log messages every time, only the latest message. So the log needs
to retain previous messages to have them continue to be displayed to the user.

In this bug demonstration app there are two Components:

- [LogWithState](src/LogWithState.tsx) is the simplification of the Log from my game. It uses
  state to remember previous messages and then loops through all the messages to display them.
- [LogWithoutState](src/LogWithoutState.tsx) takes an array of messages and loops through and
  displays them all. This is a workaround solution for React 18 rendering in Safari. For this to
  work, the app remembers the list of previous messages in Typescript not in the React component.

[LogWithState](src/LogWithState.tsx) uses `useState` to record the full list of messages in the
`Log` component. This worked fine with React17's render call. When I upgraded to React18 and
`createRoot` I noticed that log messages were sometimes missing. Recently I discovered that this is
not reproducible in Firefox or Chrome, but is easily reproducible in Safari 16.4 and Safari Mobile
iOS 16.4.1 (the latest versions as of 2023-04-21) both on my devices and on at least one other device.

The html for this demo has two root nodes for react. We use `ReactDOM` from React 17 to render into
`react17-root`. We use `createRoot` and React 18's `render` to render into `react18-root`.

In the React 17 dom we render [LogWithState](src/LogWithState.tsx) to demonstrate that this works fine.

In the React 18 dom, we render two different components. [LogWithState](src/LogWithState.tsx) and [LogWithoutState](src/LogWithoutState.tsx).

As you can hopefully see for yourself, "LogWithState - React 17" and "LogWithoutState - React 18"
display all 10 of the log messages. "LogWithState - React 18" should be missing some of the logs.
Below is an example screenshot on my machine:

![screenshot of the bug in action](./bug-screenshot.png)

## To see this bug in action on your own computer

- clone this repo
- `yarn install`
- `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the bug in action in Safari mobile or desktop.
