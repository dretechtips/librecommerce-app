import { Request, Response } from "express-serve-static-core";
import { HttpMethod } from "../decorator/HttpMethod";
import { Schedule, ActiveSchedule, ScheduleManager } from "../model/Schedule";
import { ScheduleBody } from "../interface/Schedule.inteface";
import { ClientError } from "../model/Error";

export class ScheduleController {
  private static _schedules: ActiveSchedule = new ActiveSchedule();
  @HttpMethod("POST", "System was unable to create a new schedule for the employee.")
  public static add(req: Request, res: Response): void {
    const bSchedule: ScheduleBody = req.body.schedule;
    const schedule: Schedule = Schedule.generate(bSchedule);
    this._schedules.add(schedule);
  }
  @HttpMethod("DELETE", "System was unable to delete the schedule.")
  public static delete(req: Request, res: Response): void {
    const scheduleID: string = req.body.schedule.scheduleID;
    if(!scheduleID)
      throw new ClientError("Client didn't provide a schedule ID.");
    const schedule: Schedule | null = ScheduleManager.from.id(scheduleID);
    if(!schedule)
      throw new ClientError("Client provided a schedule ID that doesn't exist in the system.");
    this._schedules.delete(scheduleID);
    return;
  }
  @HttpMethod("PATCH", "System was unable to update the schedule.")
  public static update(req: Request, res: Response): void {
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
    schedule.update(req.body.schedule);
    this.activeSchedule.delete(scheduleID);
    this.activeSchedule.add(schedule);
    return;
}
}