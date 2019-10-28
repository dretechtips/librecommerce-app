import express = require('express');
import * as AlertController from "../controller/Alert.controller";

const adminRoute: express.Router = express.Router();
const clientRoute: express.Router = express.Router();

adminRoute.post('/add', AlertController.add);
adminRoute.delete('/remove', AlertController.remove);
adminRoute.get('/list', AlertController.list);

clientRoute.get('/list', AlertController.list);

export { adminRoute, clientRoute };