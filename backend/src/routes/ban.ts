import express = require("express");
import * as BanController from "../controller/Ban.controller";

const landingRoute: express.Router = express.Router();
const adminRoute: express.Router = express.Router();

landingRoute.use('/', BanController.verify);
landingRoute.post('/ban/appeal', BanController.appeal);

adminRoute.post('/add', BanController.add);
adminRoute.delete('/remove', BanController.remove);
adminRoute.post('/review', BanController.review);

export { landingRoute, adminRoute };
