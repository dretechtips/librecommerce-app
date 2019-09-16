import * as express from "express";
import { UserController } from "../controller/User.controller";
const router: express.Router = express.Router();

router.use('/verify', (req, res, next) => UserController.verify(req, res, next));
router.post('/signin', (req, res) => UserController.login(req, res));
router.post('/forgotpassword', (req, res) => UserController.update(req, res));

export default router;