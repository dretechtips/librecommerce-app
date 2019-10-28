import * as express from "express";
import * as BillingController from "../controller/Billing.controller";
const router = express.Router();

router.get('/search', BillingController.search);
router.get('/search/today', BillingController.searchToday);

export default router;