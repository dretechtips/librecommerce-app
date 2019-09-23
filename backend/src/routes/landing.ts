import * as express from "express";
import { LandingController } from "../controller/Landing.controller";
import { landingRoute as BanRoutes } from "./ban";
const router: express.Router = express.Router();

router.use('/', BanRoutes);

router.get(['/', '/home'], (req, res) => LandingController.renderHome(req, res));
router.get('/shop', (req, res) => LandingController.renderShop(req, res));
router.get('/contact', (req, res) => LandingController.renderContract(req, res));

export default router;