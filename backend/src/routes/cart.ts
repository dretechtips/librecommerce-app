import * as express from "express";
import { CartController } from "../controller/Cart.controller";
const ClientRoute: express.Router = express.Router();
const AdminRoute: express.Router = express.Router();

ClientRoute.use((req, res, next) => CartController.verify(req, res, next));
ClientRoute.post('/checkout', (req, res) => CartController.checkout(req, res));
ClientRoute.get('/items', (req, res) => CartController.listItems(req, res));

AdminRoute.get('/search', (req, res) => CartController.search(req, res));

export {  ClientRoute, AdminRoute  };