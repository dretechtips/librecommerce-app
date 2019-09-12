import * as express from "express";
import { OrdersController } from "../controller/Orders.controller";
const router: express.Router = express.Router();

// router.get('/', (req, res) => OrdersController.renderDashboard(req, res));

// router.route('/search')
// .get((req, res) => OrdersController.renderSearch(req, res));

// router.route('/add')
// .get((req, res) => OrdersController.renderAdd(req, res))
// .post((req, res) => OrdersController.add(req, res));

// router.delete('/remove', (req, res) => OrdersController.remove(req, res));

// router.patch('/update', (req, res) => OrdersController.update(req, res));

router.get('/search', (req, res) => OrdersController.search(req, res));
router.post('/add', (req, res) => OrdersController.add(req, res));
router.delete('/delete', (req, res) => OrdersController.remove(req, res));
router.delete('/complete', (req, res) => OrdersController.complete(req, res));
router.patch('/update', (req, res) => OrdersController.update(req, res));
router.get('/hold/list', (req, res) => OrdersController.getHoldList(req, res));
router.post('/hold/add', (req, res) => OrdersController.hold(req, res));
router.delete('/hold/delete', (req, res) => OrdersController.unhold(req, res));


export default router;