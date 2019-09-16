import * as express from "express";

import { ClientRoute as CustomerRoutes } from "./customer";
import { ClientRoute as CartRoutes } from "./cart";

const router: express.Router = express.Router();

router.use('/', CustomerRoutes);
router.use('/shop');
router.use('/setting');
router.use('/cart', CartRoutes);


export default router;