import express = require('express');
import { AlertController } from "../controller/Alert.controller";

const adminRoute: express.Router = express.Router();
const clientRoute: express.Router = express.Router();

adminRoute.post('/add', (req, res) => AlertController.add(req, res));
adminRoute.delete('/remove', (req, res) => AlertController.remove(req, res));
adminRoute.patch('/update', (req, res) => AlertController.update(req, res));
adminRoute.get('/list', (req, res) => AlertController.list(req, res));

clientRoute.get('/list', (req, res) => AlertController.list(req, res));

export { adminRoute, clientRoute };