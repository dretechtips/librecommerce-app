import express = require("express");
import { BanController } from "../controller/Ban.controller";

const landingRoute: express.Router = express.Router();
const adminRoute: express.Router = express.Router();

landingRoute.use('/', (req, res, next) => BanController.verify(req, res, next));
landingRoute.post('/ban/appeal', (req, res) => BanController.appeal(req, res));

adminRoute.post('/add', (req, res) => BanController.add(req, res));
adminRoute.delete('/remove', (req, res) => BanController.remove(req, res));
adminRoute.post('/review', (req, res) => BanController.review(req, res));


export { landingRoute, adminRoute };
