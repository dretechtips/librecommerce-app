import * as express from "express";
import * as pug from "pug";
import { InventoryController } from "../controller/inventoryController";

const router = express.Router();

router.get('/', (req, res) => InventoryController.renderAdd(req, res));

router.get('/search', (req, res) => InventoryController.renderSearch(req, res));

router.get('/add', (req, res) => InventoryController.renderAdd(req, res));

router.delete('/remove', (req, res) => InventoryController.remove(req, res));

router.patch('/update', (req, res) => InventoryController.update(req, res));

export default router;