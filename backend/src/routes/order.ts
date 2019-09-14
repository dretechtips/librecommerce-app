import * as express from "express";
import { OrdersController } from "../controller/Orders.controller";

const AdminRoute: express.Router = express.Router();
const ClientRoute: express.Router = express.Router();

AdminRoute.get('/search', (req, res) => OrdersController.search(req, res));
AdminRoute.post('/add', (req, res) => OrdersController.add(req, res));
AdminRoute.delete('/delete', (req, res) => OrdersController.remove(req, res));
AdminRoute.delete('/complete', (req, res) => OrdersController.complete(req, res));
AdminRoute.patch('/update', (req, res) => OrdersController.update(req, res));
AdminRoute.get('/hold/list', (req, res) => OrdersController.getHoldList(req, res));
AdminRoute.post('/hold/add', (req, res) => OrdersController.hold(req, res));
AdminRoute.delete('/hold/delete', (req, res) => OrdersController.unhold(req, res));

// WebSocket Connection
ClientRoute.get('/feed', (req, res) => OrdersController.feed(req, res));

export { AdminRoute, ClientRoute };