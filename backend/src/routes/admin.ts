import * as express from "express";
import { AdminController } from "../controller/Admin.controller";

import { default as BillingRoutes } from "./billing";
import { default as CouponRoutes } from "./coupon";
import { AdminRoute as  CustomerRoutes } from "./customer";
import { AdminRoute as InventoryRoutes } from "./inventory";
import { AdminRoute as OrderRoutes } from "./order";
import { default as PromoRoutes } from "./promo";
import { default as SpyRoutes } from "./spy";
import { default as UserRoutes } from "./user";
import { AdminRoute as CartRoutes } from "./cart";
import { default as ScheduleRoutes } from "./schedule";
import { default as SFRoute } from "./speechfilter";

const router: express.Router = express.Router();

router.get(['', '/home'], (req, res) => AdminController.renderHome(req, res));

// The Root URL will be used for downloading the react.js file
router.use('/', UserRoutes);
router.use('/inventory', InventoryRoutes);
router.use('/order', OrderRoutes);
router.use('/customer', CustomerRoutes);
router.use('/billing', BillingRoutes);
router.use('/promo', BillingRoutes);
router.use('/coupon', CouponRoutes);
router.use('/promo', PromoRoutes);
router.use('/spy', SpyRoutes);
router.use('/cart', CartRoutes);
router.use('/schedule', ScheduleRoutes);
router.use('/speech-filter', SFRoute);

export default router;
