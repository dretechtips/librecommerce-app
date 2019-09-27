import express = require('express');
import { ShippingController } from "../controller/Shipping.controller";

const clientRoute: express.Router = express.Router();
const adminRoute: express.Router = express.Router();

clientRoute.get('/id', (req, res) => ShippingController.getShippingID(req, res));

adminRoute.get('/id', (req, res) => ShippingController.getShippingID(req, res));
adminRoute.delete('/cancel', (req, res) => ShippingController.cancel(req, res));
adminRoute.delete('/delete', (req, res) => ShippingController.delete(req, res));
adminRoute.post('/add', (req, res) => ShippingController.add(req, res));
adminRoute.patch('/update', (req, res) => ShippingController.update(req, res));

export {clientRoute, adminRoute};