import { ScheduleConstructor, ScheduleBody } from "../interface/Schedule.inteface";
import { WeekEvents } from "../type/WeekEvents";
import { TimeRange } from "../type/Range";
import uuid = require("uuid/v4");

export class Schedule
{
  private _value: ScheduleConstructor
  constructor(schedule: ScheduleConstructor)
  {
    this._value = schedule;
  }
  public static generate(body: ScheduleBody): Schedule {
    const schedule: ScheduleConstructor = {
      userID: body.userID,
      scheduleID: uuid(),
      events: new WeekEvents(body.events)
    }
    return new Schedule(schedule);
  }
  public save(): void {
    
  }
  public delete(): void {

  }
  public static From = class {
    public static id(scheduleID: string) {

    }
  }
}