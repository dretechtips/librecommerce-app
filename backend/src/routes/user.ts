import * as express from "express";
import { UserController } from "../controller/User.controller";
const router: express.Router = express.Router();

router.use('/', (req, res, next) => UserController.verify(req, res, next));
router.route('/signin')
.get((req, res) => UserController.renderLogin(req, res))
.post((req, res) => UserController.login(req, res));
router.route('/forgotpassword')
.get((req, res) => UserController.renderForgotPass(req, res))
.post((req, res) => UserController.update(req, res));

export default router;