import * as express from "express";
import { BillingController } from "../controller/Billing.controller";
const router = express.Router();

router.get('/search', (req, res) => BillingController.search(req, res));
router.get('/search/today', (req, res) => BillingController.searchToday(req, res));

export default router;