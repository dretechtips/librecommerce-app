import express = require("express");
import { ScheduleController } from "../controller/Schedule.controller";
const router: express.Router = express.Router();

router.post("/add", (req, res) => ScheduleController.add(req, res));
router.delete("/delete", (req, res) => ScheduleController.delete(req, res));
router.patch("/update", (req, res) => ScheduleController.update(req, res));

export default router;
