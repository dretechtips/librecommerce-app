import * as express from "express";
import { IndexController } from "../controller/indexController";
import { UsersController } from "../controller/usersController";
import { default as inventory } from "./inventory";
import { default as orders } from "./orders";
import { default as customers } from "./customers";

const router: express.Router = express.Router();

router.use((req, res, next) => UsersController.loginValidation(req, res, next));

router.route('/login')
.get((req, res) => UsersController.renderLoginPage(req, res))
.post((req, res) => UsersController.login(req, res));

router.get(['', '/home'], (req, res) => IndexController.renderHomePage(req, res));

router.use('/inventory', inventory);

router.use('/orders', orders);

router.use('/customers', customers);

export default router;
