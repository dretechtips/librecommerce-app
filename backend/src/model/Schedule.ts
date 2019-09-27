import { ScheduleConstructor, ScheduleBody } from "../interface/Schedule.inteface";
import { WeekEvents, SingleEvent } from "../type/Events";
import { TimeRange } from "../type/Range";
import uuid = require("uuid/v4");
import { Day } from "../interface/Events.interface";
import fs = require("fs");

export class ActiveSchedule
{
  private _schedule: Map<string, Schedule>;
  private _filePath: string;
  constructor() {
    this._schedule = new Map();
    this.setEvents();
  }
  private importSchedule(): void {
    const schedules: Schedule[] = Schedule.From.active(true);
    for (let i = 0; i < schedules.length; i++) {
      const cur: Schedule = schedules[i];
      this._schedule.set(cur.getID(), cur);
    }
  }
  public delete(scheduleID: string): void {
    this._schedule.delete(scheduleID);
  }
  public save(): void {
    // DB Method
  }
  public add(schedule: Schedule): void {
    this._schedule.set(schedule.getID(), schedule);
  }
  private setEvents(): void {
    process.on("beforeExit", () => {
      this.save();
    });
  }
}

export class ScheduleManager {
  public static from = class {
    public static id(scheduleID: string): Schedule | null {
      
    }
    public static active(isActive: boolean): Schedule[] | null {

    }
  }
}

export class Schedule
{
  private _value: ScheduleConstructor;
  private _limits: number[] = [1, 1, 1, 1, 1, 1, 1]; 
  constructor(schedule: ScheduleConstructor)
  {
    try {
      if (schedule.events.getLimitAll() !== this._limits)
        throw new Error("System cannot create a schedule with an exceedling limit.");
      this._value = schedule;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public update(body: any): void {
    if(body.scheduleID) this._value.scheduleID = body.scheduleID;
    if(body.userID) this._value.userID = body.userID;
    if(body.events) this._value.events = new WeekEvents(body.events, [1, 1, 1, 1, 1, 1, 1]);
  }
  public addEvent(name: string, day: Day, hours: TimeRange) {
    try {
      const totalHour: number = this._value.events.getTotalHours();
      if (!this._value.hasOverTime && (40 < (totalHour + hours.getTotalHours())))
        throw new Error("This employee schedule doesn't allow over time.");
      this._value.events.addEvent(new SingleEvent(name, hours), day);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public getValue(): ScheduleConstructor {
    return this._value; 
  }
  public deleteEvent(eventID: string, day?: Day): void {
    this._value.events.deleteEvent(eventID, day);
  }
  public static generate(body: ScheduleBody): Schedule {
    const scheduleConstruct: ScheduleConstructor = {
      userID: body.userID,
      scheduleID: uuid(),
      events: WeekEvents.generate(body.events, [1, 1, 1, 1, 1, 1, 1]),
      hasOverTime: body.hasOverTime
    }
    return new Schedule(scheduleConstruct);
  }
  public getID(): string {
    return this.getValue().scheduleID;
  }
}