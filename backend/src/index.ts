/// <reference path="./libs/global.d.ts" />
/// <reference path="./libs/node.d.ts" />

import express = require('express');
import * as http from 'http';
import WebSocket = require('ws');

import HttpErrorHandler from './helper/HttpErrorHandler';

const app: express.Express = express();
const server: http.Server = http
  .createServer(app)
  .listen(8000, '127.0.0.1', () => {
    hconsole.log(
      `Initalizing HTTP Server with the IP Address of ${server.address()}`
    );
  });
export const wsServer: WebSocket.Server = new WebSocket.Server(
  { server },
  () => {
    hconsole.log(
      `Initalizing WebSocket Server with the IP Address of ${server.address()}`
    );
  }
);

app.set('view engine', require('pug'));

app.use(HttpErrorHandler);

app.use((req, res, next) => {
  hconsole.log(
    `There a new connection from the IP Address ${req.connection
      .remoteAddress || req.header('x-forward-for')}`
  );
  next();
});

app.use('/', require('./routes/landing'));
app.use('/admin', require('./routes/admin'));
app.use('/client', require('./routes/client'));
