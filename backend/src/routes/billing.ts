import * as express from "express";
import { BillingController } from "../controller/Billing.controller";
const router = express.Router();

router.get('/report', (req, res) => BillingController.renderToday(req, res));

router.route('/search')
.get((req, res) =>)
.post((req, res) =>)

export default router;