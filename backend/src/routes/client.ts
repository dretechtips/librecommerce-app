import * as express from "express";

import { ClientRoute as CustomerRoutes } from "./customer";
import { ClientRoute as CartRoutes } from "./cart";
import { ClientRoute as ShoppingRoutes } from "./inventory";
import { clientRoute as ShippingRoutes } from "./shipping";

const router: express.Router = express.Router();

router.use('/', CustomerRoutes);
router.use('/shop', ShoppingRoutes);
//router.use('/setting', );
router.use('/cart', CartRoutes);
router.use('/shipping', ShippingRoutes);


export default router;