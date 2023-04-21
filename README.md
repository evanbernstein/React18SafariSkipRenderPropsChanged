# Potential Bug in React 18 with Safari

This is either a demonstration of a bug with React 18 in Safari, or a demonstration of how I don't
quite understand React rendering.

This is a very small portion of a React/Typescript/Python game that I've been coding for myself
for fun. I don't own the IP of the game, so I cannot share the game repository itself. This is a
very trimmed down demonstration of the bug.

The game displays a text log of the players' actions. These messages get sent from the server,
usually one at a time. Sometimes these messages arrive in quick succession, ms apart. I don't have
the game server send all of the log messages every time, only the latest message.

In React, I was using `useState` to record the full list of messages in the `Log` component. This
worked fine with React17's render call. When I upgraded to React18 and `createRoot` I noticed that
log messages were sometimes missing. Recently I discovered that this is not reproducible in Firefox
or Chrome, but is easily reproducible in Safari 16.4 and Safari Mobile (iOS 16.4.1) both on my
devices and on at least one other device.

This repository is hopefully a simple demonstration of the bug (or my misunderstanding) of how this
works in React 17, how it breaks in React 18, and the obvious workaround in React 18.

The html for this demo has two root nodes for react. We use `ReactDOM` from React 17 to render into
`react17-root`. We use `createRoot` and React 18's `render` to render into `react18-root`.

In the React 18 dom, we render two different components. `LogWithState` and `LogWithoutState`.

- `LogWithState` is the simplification of the Log from my game. It uses state to remember previous
  messages and then loops through all the messages to display them.
- `LogWithoutState` takes an array of messages and loops through and displays them all. This is a
  workaround solution for React 18 rendering in Safari.

Rendering in React 17 only uses `LogWithState`.

As you can hopefully see for yourself, "LogWithState - React 17" and "LogWithoutState - React 18"
display all 10 of the log messages. "LogWithState - React 18" should be missing some of the logs and
display a message "MISSING LOGS" at some (random) points.

It seems that React 18 in Safari is not always rendering every render call, even if the props have
changed. Is this a bug, or am I misunderstanding something fundamental about React?

![screenshot of the bug in action](./bug-screenshot.png)

## To see this bug in action on your own computer

- clone this repo
- `yarn install`
- `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the bug in action in Safari mobile or desktop.
