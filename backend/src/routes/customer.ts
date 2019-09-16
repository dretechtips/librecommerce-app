import * as express from "express";
import { CustomerController } from "../controller/Customer.controller";
const AdminRoute: express.Router = express.Router();
const ClientRoute: express.Router = express.Router();

AdminRoute.post('/add', (req, res) => CustomerController.add(req, res));
AdminRoute.delete('/remove', (req, res) => CustomerController.remove(req, res));
AdminRoute.patch('/update', (req, res) => CustomerController.update(req, res));

ClientRoute.use('/', (req, res, next) => CustomerController.verify(req, res, next));
ClientRoute.post('/signin', (req, res) => CustomerController.signin(req, res));
ClientRoute.patch('/forgotpassword', (req, res) => CustomerController.emailPassword(req, res));
ClientRoute.post('/register', (req, res) => CustomerController.add(req, res));


export { ClientRoute, AdminRoute };