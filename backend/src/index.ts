/// <reference path="./libs/global.d.ts" />
/// <reference path="./libs/node.d.ts" />
/// <reference path="./libs/express.d.ts" />

import express = require("express");
import * as http from "http";
import WebSocket = require('ws');

import { default as ClientRoutes } from "./routes/client";
import { default as AdminRoutes } from "./routes/admin";
import { default as LandingRoutes } from "./routes/landing";

const app: express.Express = express.extend();
const server: http.Server = http.createServer(app).listen(8000, '127.0.0.1', () =>
{
  hconsole.log(`Initalizing HTTP Server with the IP Address of ${server.address()}`);
});
export const wsServer: WebSocket.Server = new WebSocket.Server({ server }, () => {
  hconsole.log(`Initalizing WebSocket Server with the IP Address of ${server.address()}`);
});

app.use((req, res, next) => {
  hconsole.log(`There a new connection from the IP Address ${req.connection.remoteAddress || req.header('x-forward-for')}`);
  next();
});

app.use('/', LandingRoutes);
app.use('/admin', AdminRoutes);
app.use('/client', ClientRoutes);

