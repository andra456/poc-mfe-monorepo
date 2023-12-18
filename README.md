# monorepo-project

Create monorepo &amp; design system

### Apps and Packages

- `component-design-ui`: a [React.JS]() app
- `dashboard`: another [React.Js]() app, demo : [here](https://main--heartfelt-bombolone-cbb7cb.netlify.app)
- `chat-server`: Node JS

## Setup

This repository is used in the `npx lerna@latest` command.

### Build

To build all apps and packages, run the following command:

```
cd monorepo-test-socket
yarn
yarn bootstrap
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd monorepo-test-socket

// for dashboard dev
yarn dashboard:dev

// admin dev
yarn admin:dev

// chat-server
chat-server:dev
```
