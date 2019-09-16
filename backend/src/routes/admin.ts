import * as express from "express";
import { AdminController } from "../controller/Admin.controller";

import { default as BillingRoutes } from "./billing";
import { default as CouponRoutes } from "./coupon";
import { AdminRoute as  CustomerRoutes } from "./customer";
import { default as InventoryRoutes } from "./inventory";
import { AdminRoute as OrderRoutes } from "./order";
import { default as PromoRoutes } from "./promo";
import { default as SpyRoutes } from "./spy";
import { default as UserRoutes } from "./user";
import { AdminRoute as CartRoutes } from "./cart";

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

export default router;
