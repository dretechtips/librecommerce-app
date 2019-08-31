import * as express from "express";
import { CustomersController } from "../controller/customerController";
const router = express.Router();

router.get('/', (req, res) => CustomersController.renderDashboard(req, res));

router.route('/add')
.get((req, res) => CustomersController.renderAdd(req, res))
.post((req, res) => CustomersController.add(req, res));

router.delete('/remove', (req, res) => CustomersController.remove(req, res));

export default router;