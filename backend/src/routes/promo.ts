import * as express from "express";
import { PromoController } from "../controller/Promo.controller";
const router = express.Router();

router.post('/add', (req, res) => PromoController.add(req, res));
router.delete('/delete', (req, res) => PromoController.delete(req, res))
router.patch('/update', (req, res) => PromoController.update(req, res));

export default router;