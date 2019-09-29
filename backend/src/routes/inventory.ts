import * as express from "express";
import * as pug from "pug";
import { InventoryController } from "../controller/Inventory.controller";

const AdminRoute: express.Router = express.Router();
const ClientRoute: express.Router = express.Router();

AdminRoute.get('/category', (req, res) => InventoryController.getCategories(req, res));
AdminRoute.get('/product/search', (req, res) => InventoryController.search(req, res));
AdminRoute.post('/product/add', (req, res) => InventoryController.add(req, res));
AdminRoute.post('/product/add/variation/', (req, res) => InventoryController.addOnBase(req, res));
AdminRoute.delete('/product/remove', (req, res) => InventoryController.remove(req, res));
AdminRoute.patch('/product/update', (req, res) => InventoryController.update(req, res));
AdminRoute.get('/product/color', (req, res) => InventoryController.listColor(req, res));

ClientRoute.get('/product/search', (req, res) => InventoryController.search(req, res));

export { AdminRoute, ClientRoute };