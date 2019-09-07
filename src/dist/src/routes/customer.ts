import * as express from "express";
import { CustomersController } from "../controller/Customer.controller";
const adminRoute: express.Router = express.Router();
const clientRoute: express.Router = express.Router();

adminRoute.get('/', (req, res) => CustomersController.renderDashboard(req, res));
adminRoute.route('/add')
.get((req, res) => CustomersController.renderAdd(req, res))
.post((req, res) => CustomersController.add(req, res));
adminRoute.delete('/remove', (req, res) => CustomersController.remove(req, res));
adminRoute.patch('/update', (req, res) => CustomersController.update(req, res));

clientRoute.route('/signin')
.get((req, res) => CustomersController.renderSignIn(req, res))
.post((req, res) => CustomersController.signin(req, res));
clientRoute.route('/forgotpassword')
.get((req, res) => CustomersController.renderForgotPass(req, res))
.post((req, res) => CustomersController.emailPassword(req, res));
clientRoute.route('/register')
.get((req, res) => CustomersController.renderRegister(req, res))
.post((req, res) => CustomersController.add(req, res));


export { clientRoute, adminRoute };