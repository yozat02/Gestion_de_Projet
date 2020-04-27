# ISC DASHBOARD V2

1. Follow instructions on Docker Section to set up the environment.
2. Follow instructions on Server Section to set up the server.
3. Follow instructions on Client Section to set up the client.
4. Run dev script from root directory with npm to launch server and client at same time :

> npm install

> npm run dev

## Docker

### Services

- mongo : MongoDB Database

Change directory to Docker Folder and run docker-compose :

> cd docker

> docker-compose up -d

## Server

### Dependencies

- "express": a very popular framework for Node.js applications.
- "body-parser": is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- "mongoose": is a MongoDB object modeling tool designed to work in an asynchronous environment.
- "graphql": is a query language for APIs.
- "apollo-server-express": is the Express and Connect integration of GraphQL Server.

### Server Dev Dependencies

- "nodemon": nodemon is a package that runs the node.js application and listen to any file change, updating the entire app.
- "concurrently": Concurrently allows us to run multiple npm commands at the same time.

### Server Instructions

Make sure to change directory to server and run npm i to install dependencies from package.json

> npm install

## Client

### Client Dependencies

- "http-proxy-middleware": is used to create a proxy from our react app to the backend app while on development.
- "axios": is a very popular promise based HTTP client for the browser and node.js.

### Client Instructions

Make sure to change directory to client and run npm i to install dependencies from package.json

> npm install
