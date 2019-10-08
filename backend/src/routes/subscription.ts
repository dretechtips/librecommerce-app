import express = require('express');
import { ClientSubscriptionController, AdminSubscriptionController } from "../controller/Subscription.controller";

const adminRoute: express.Router = express.Router();
const clientRoute: express.Router = express.Router();

adminRoute.post('/add', (req, res) => AdminSubscriptionController.add(req, res));
adminRoute.delete('/delete', (req, res) => AdminSubscriptionController.remove(req, res));
adminRoute.patch('/update', (req, res) => AdminSubscriptionController.update(req, res));
adminRoute.get('/list', (req, res) => AdminSubscriptionController.list(req, res));

clientRoute.post('/add', (req, res) => ClientSubscriptionController.add(req, res));
clientRoute.delete('/delete', (req, res) => ClientSubscriptionController.remove(req, res));
clientRoute.patch('/update', (req, res) => ClientSubscriptionController.update(req, res));
clientRoute.get('/list', (req, res) => ClientSubscriptionController.list(req, res));

export { adminRoute, clientRoute };