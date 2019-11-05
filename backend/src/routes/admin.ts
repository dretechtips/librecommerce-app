import * as express from 'express';
import * as AdminController from '../controller/Admin.controller';

import { default as BillingRoutes } from './billing';
import { default as CouponRoutes } from './coupon';
import { AdminRoute as CustomerRoutes } from './customer';
import { AdminRoute as InventoryRoutes } from './inventory';
import { AdminRoute as OrderRoutes } from './order';
import { default as PromoRoutes } from './promo';
import { default as PayrollRoutes } from './payroll';
import { default as SpyRoutes } from './spy';
import { default as UserRoutes } from './user';
import { AdminRoute as CartRoutes } from './cart';
import { default as ScheduleRoutes } from './schedule';
import { adminRoute as ShippingRoute } from './shipping';
import { default as SFRoute } from './speechfilter';
import { adminRoute as SubscriptionRoutes } from './subscription';
import { adminRoute as AlertRoutes } from './alert';

const router: express.Router = express.Router();

router.get('/interface', (req, res) => AdminController.getInterface(req, res));
router.use('/api', (req, res, next) => AdminController.monitor(req, res, next));
// Add Ban
router.use('/api/alert', AlertRoutes);
router.use('/api/user', UserRoutes);
router.use('/api/inventory', InventoryRoutes);
router.use('/api/order', OrderRoutes);
router.use('/api/customer', CustomerRoutes);
router.use('/api/billing', BillingRoutes);
router.use('/api/coupon', CouponRoutes);
router.use('/api/promo', PromoRoutes);
router.use('/api/payroll', PayrollRoutes);
router.use('/api/spy', SpyRoutes);
router.use('/api/cart', CartRoutes);
router.use('/api/schedule', ScheduleRoutes);
router.use('/api/shipping', ShippingRoute);
router.use('/api/speech-filter', SFRoute);
router.use('/api/subscription', SubscriptionRoutes);

export default router;
