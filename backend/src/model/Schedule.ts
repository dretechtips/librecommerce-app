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
  public save(): void {
    
  }
  public delete(): void {
    
  }
  public update(body: any): void {
    if(body.scheduleID) this._value.scheduleID = body.scheduleID;
    if(body.userID) this._value.userID = body.userID;
    if(body.events) this._value.events = new WeekEvents(body.events);
  }
  public static generate(body: ScheduleBody): Schedule {
    const schedule: ScheduleConstructor = {
      userID: body.userID,
      scheduleID: uuid(),
      events: new WeekEvents(body.events)
    }
    return new Schedule(schedule);
  }
  public static From = class {
    public static id(scheduleID: string): Schedule {
      
    }
  }
}