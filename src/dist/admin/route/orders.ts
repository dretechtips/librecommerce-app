import * as express from "express";
import { OrdersController } from "../controller/Orders.controller";
const router: express.Router = express.Router();

router.get('/', (req, res) => OrdersController.renderDashboard(req, res));

router.route('/search')
.get((req, res) => OrdersController.renderSearch(req, res));

router.route('/add')
.get((req, res) => OrdersController.renderAdd(req, res))
.post((req, res) => OrdersController.add(req, res));

router.delete('/remove', (req, res) => OrdersController.remove(req, res));

router.patch('/update', (req, res) => OrdersController.update(req, res));

export default router;