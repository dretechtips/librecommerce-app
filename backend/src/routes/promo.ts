import * as express from "express";
import { PromoController } from "../controller/Promo.controller";
const router = express.Router();

router.get('/', (req, res) => PromoController.renderDashboard(req, res));

router.route('/add')
.get((req, res) => PromoController.renderAdd(req, res));

router.delete('/delete', (req, res) => PromoController.delete(req, res))

router.patch('/update', (req, res) => PromoController.update(req, res));

export default router;