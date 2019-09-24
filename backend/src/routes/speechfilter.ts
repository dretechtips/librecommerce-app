import express = require('express');
import { SFController } from "../controller/SpeechFilter.controller";

const router: express.Router = express.Router();

router.post('/add', (req, res) => SFController.add(req, res));
router.delete('/remove', (req, res) => SFController.remove(req, res));
router.patch('/update', (req, res) => SFController.update(req, res));
router.get('/list', (req, res) => SFController.list(req, res));

export default router;