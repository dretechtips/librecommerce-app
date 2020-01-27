/// <reference path="./libs/global.d.ts" />
/// <reference path="./libs/node.d.ts" />
import Koa from "koa";
import WebSocket from "ws";
import express from "express";

import HttpErrorHandler from "./helper/HttpErrorHandler";

const app = new Koa();
app.listen(8000);

app.use(async (ctx, next) => {
  console.log(
    `There a new connection from the IP Address ${req.connection
      .remoteAddress || req.header("x-forward-for")}`
  );
  await next();
});

app.use("/", require("./routes/landing"));
app.use("/admin", require("./routes/admin"));
app.use("/client", require("./routes/client"));
