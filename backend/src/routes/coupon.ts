import { Request, Response } from "express-serve-static-core";
import { CouponsController } from "../controller/Coupon.controller";
import * as express from "express";
const router: express.Router = express.Router();

router.route('/add')
.get((req, res) => CouponsController.renderAdd(req, res))
.post((req, res) => CouponsController.add(req, res));
router.delete('/delete', (req, res) => CouponsController.delete(req, res));
router.patch('/update', (req, res) => CouponsController.update(req, res));
router.route('/search')
.get((req, res) => CouponsController.renderSearch(req, res))
.post((req, res) => CouponsController.search(req, res));

export default router;
