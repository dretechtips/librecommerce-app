import * as express from "express";
import * as pug from "pug";
import { InventoryController } from "../controller/Inventory.controller";

const router: express.Router = express.Router();

router.get('/search', (req, res) => InventoryController.search(req, res));
router.get('/category', (req, res) => InventoryController.getCategories(req, res));
router.get('/product/id', (req, res) => InventoryController.find(req, res));
router.post('/product/add', (req, res) => InventoryController.add(req, res));
router.delete('/product/remove', (req, res) => InventoryController.remove(req, res));
router.patch('/product/update', (req, res) => InventoryController.update(req, res));
router.get('/product/color', (req, res) => InventoryController.getColor(req, res));

export default router;