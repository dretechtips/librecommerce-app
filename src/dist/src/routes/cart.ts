import * as express from "express";
import { CartController } from "../controller/Cart.controller";
const ClientRoute: express.Router = express.Router();
const AdminRoute: express.Router = express.Router();

ClientRoute.use((req, res, next) => CartController.verify(req, res, next));
ClientRoute.route('/checkout')
.get((req, res) => CartController.renderCheckout(req, res))
.post((req, res) => CartController.checkout(req, res))

AdminRoute.get('/dashboard', (req, res) => CartController.renderDashboard(req, res));
AdminRoute.route('/search')
.get((req, res) => CartController.renderSearch(req, res))
.post((req, res) => CartController.search(req, res));

export {  ClientRoute, AdminRoute  };