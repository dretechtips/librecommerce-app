import { Request, Response } from "express-serve-static-core";
import { HttpMethod } from "../decorator/HttpMethod";
import { Schedule } from "../model/Schedule";

export class ScheduleController {
  @HttpMethod("POST")
  public static add(req: Request, res: Response): void {
    try {
      const schedule: Schedule =  Schedule.generate(req.body.schedule);
      schedule.save();
      return;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to create a new schedule for the employee."});
    }
  }
  @HttpMethod("DELETE")
  public static delete(req: Request, res: Response): void {
    try {
      const scheduleID: string = req.body.schedule.scheduleID;
      if(!scheduleID){
        res.send({success: false, error: "Client didn't provide a schedule ID."});
        return;
      }
      const schedule: Schedule = Schedule.From.id(scheduleID);
      if(!schedule){
        res.send({success: false, error: "Schedule ID doesn't exist in the system."});
        return;
      }
      schedule.delete();
      return;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to delete the schedule."});
    }
  }
  @HttpMethod("PATCH")
  public static update(req: Request, res: Response): void {
    try {
      const scheduleID: string = req.body.schedule.scheduleID;
      if(!scheduleID){
        res.send({success: false, error: "Clinet didn't provide a schedule ID."});
        return;
      }
      const schedule: Schedule = Schedule.From.id(scheduleID);
      if(!schedule){
        res.send({success: false, error: "Schedule ID doesn't exist in the system."});
        return;
      }
      schedule.update(req.body.schedule);
      return;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to updat the schedule."});
    }
  }
}