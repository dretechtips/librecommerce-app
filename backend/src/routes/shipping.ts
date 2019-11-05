import express = require('express');
import {
  getID,
  remove,
  cancel,
  add,
  get
} from '../controller/Shipping.controller';
import HttpSuccessHandler from '../helper/HttpSuccessHandler';

const clientRoute: express.Router = express.Router();
const adminRoute: express.Router = express.Router();

clientRoute.get('/id', [get, getID, HttpSuccessHandler]);

adminRoute.get('/id', [get, getID, HttpSuccessHandler]);
adminRoute.delete('/delete', [get, ...remove, HttpSuccessHandler]);
adminRoute.delete('/cancel', [get, cancel, HttpSuccessHandler]);
adminRoute.post('/add', [add, HttpSuccessHandler]);

export { clientRoute, adminRoute };
