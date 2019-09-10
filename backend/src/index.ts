import * as express from "express";
import * as session from "express-session";
import * as http from "http";
import { default as hconsole } from "./model/Console";

import { default as ClientRoutes } from "./routes/client";
import { default as AdminRoutes } from "./routes/admin";
import { default as LandingRoutes } from "./routes/landing";

const app: express.Express = express();
const server: http.Server = http.createServer(app).listen(8000, '127.0.0.1', () =>
{
  hconsole.log(`Initalizing Server with the IP Address of ${server.address()}`);
});

app.use((req, res, next) => {
  hconsole.log(`There a new connection from the IP Address ${req.connection.remoteAddress || req.header('x-forward-for')}`);
  next();
});

app.use('/', LandingRoutes);
app.use('/admin', AdminRoutes);
app.use('/client', ClientRoutes);