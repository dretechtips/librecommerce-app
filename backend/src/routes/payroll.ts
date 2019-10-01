import express = require('express');
import { PayrollController } from "../controller/Payroll.controller";
const router: express.Router = express.Router();

router.get('/list', (req, res) => PayrollController.list(req, res));
router.post('/pay', (req, res) => PayrollController.pay(req, res));

export default router;