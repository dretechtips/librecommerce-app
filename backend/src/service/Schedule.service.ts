import { ActiveSchedule } from "../model/Schedule";

export class ScheduleManager {
  private _schedules: ActiveSchedule;
  private _maxSchedules: number;
  
  constructor(schedules: ActiveSchedule) {
    this._schedules = schedules;
  }
  
}