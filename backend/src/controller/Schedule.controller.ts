import { Request, Response } from "express";
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
  }
  @HttpMethod("PATCH", "System was unable to update the schedule.")
  public static update(req: Request, res: Response): void {
    const scheduleID: string = req.body.schedule.scheduleID;
    if (!scheduleID)
      throw new ClientError("Client didn't provide a schedule ID.");
    const schedule: Schedule | null = this._schedules.get(scheduleID);
    if (!schedule)
      throw new ClientError("Schedule ID doesn't exist in the system.");
    schedule.update(req.body.schedule);
  }
  public static partion(req: Request, res: Response): void {

  }
}