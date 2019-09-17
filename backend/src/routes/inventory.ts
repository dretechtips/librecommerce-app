import * as express from "express";
import * as pug from "pug";
import { InventoryController } from "../controller/Inventory.controller";

const AdminRoute: express.Router = express.Router();
const ClientRoute: express.Router = express.Router();

AdminRoute.get('/search', (req, res) => InventoryController.search(req, res));
AdminRoute.get('/category', (req, res) => InventoryController.getCategories(req, res));
AdminRoute.get('/product/id', (req, res) => InventoryController.find(req, res));
AdminRoute.post('/product/add', (req, res) => InventoryController.add(req, res));
AdminRoute.delete('/product/remove', (req, res) => InventoryController.remove(req, res));
AdminRoute.patch('/product/update', (req, res) => InventoryController.update(req, res));
AdminRoute.get('/product/color', (req, res) => InventoryController.getColor(req, res));

ClientRoute.get('/product/id', (req, res) => InventoryController.find(req, res));


export default ;