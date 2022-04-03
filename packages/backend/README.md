<p align="left">
  <img src="../../public/logo.png" width=150/>
</p>

# Web3 Todo App

A simple todo list that keeps the tasks in blockchain, built with [hardhat framework](https://hardhat.org/).

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Local Deploy](#runner-local-deploy)

# :rocket: Features

* Create task
* Toggle task status

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/cunhaedu/web3-todo-list-app.git
```

**Install dependencies with yarn**

```
yarn
```

**Compile project**

```
yarn hardhat compile
```

# :runner: Local Deploy

Run the following command in order to deploy the application locally

```
yarn hardhat run --network localhost scripts/deploy.ts
```

Once you deploy your application you'll see something like it:

`Todo deployed to: 0x...`

Copy the address and keep it with you, to run the frontend you'll need to use this address.
