import * as express from "express";

import { ClientController } from "../controller/Client.controller";

import { ClientRoute as CustomerRoutes } from "./customer";
import { ClientRoute as CartRoutes } from "./cart";
import { ClientRoute as ShoppingRoutes } from "./inventory";
import { clientRoute as ShippingRoutes } from "./shipping";
import { clientRoute as SubscriptionRoutes } from "./subscription";
import { clientRoute as AlertRoutes } from "./alert";

const router: express.Router = express.Router();

router.get('/interface', (req, res) => ClientController.getFrontend(req, res));
router.use('/api', (req, res, next) => ClientController.monitor(req, res, next));
router.use('/api/account', CustomerRoutes);
router.use('/api/alert', AlertRoutes);
router.use('/api/shop', ShoppingRoutes);
router.use('/api/cart', CartRoutes);
router.use('/api/shipping', ShippingRoutes);
router.use('/api/subscription', SubscriptionRoutes);

export default router;