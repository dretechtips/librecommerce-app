import * as express from "express";

import { default as CustomerRoutes } from "./customer";
import { ClientRoute as CartRoutes } from "./cart";

const router: express.Router = express.Router();

router.use('/', CustomerRoutes.clientRoute);
router.use('/shop');
router.use('/setting');
router.use('/cart', CartRoutes);

export default router;