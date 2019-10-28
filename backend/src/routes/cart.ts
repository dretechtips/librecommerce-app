import * as express from "express";
import * as CartController from "../controller/Cart.controller";
const ClientRoute: express.Router = express.Router();
const AdminRoute: express.Router = express.Router();

ClientRoute.use(CartController.verify);
ClientRoute.post('/checkout', CartController.checkout);
ClientRoute.get('/items', CartController.listProducts);

AdminRoute.get('/search', CartController.search);

export {  ClientRoute, AdminRoute  };