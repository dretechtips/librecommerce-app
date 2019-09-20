import { ScheduleConstructor, ScheduleBody } from "../interface/Schedule.inteface";
import { WeekEvents } from "../type/WeekEvents";
import { TimeRange } from "../type/Range";
import uuid = require("uuid/v4");
import { Day } from "../interface/Week.interface";
import fs = require("fs");

export class ActiveSchedule
{
  private _schedule: Map<string, Schedule>;
  private _filePath: string;
  constructor() {
    this._schedule = new Map();
    this.importSchedule();
    this.setEvents();
  }
  private importSchedule(): void {
    
  }
  public delete(scheduleID: string): void {
    
  }
  private generateSave(): string {
    let save: string;
    this._schedule.forEach(cur => {
      const value: ScheduleConstructor = cur.getValue();
      save += value.scheduleID + " " + value.userID + " " + value.hasOverTime + " \n";
      const days: Day[] = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];
      days.forEach(cur => )
      save += Array.from(value.events.getEventsByDay("mon").values())[0].name + " " + value.events.getEventsByDay("mon").values().return().value.details.hours.getStartTime() + " ")
    });
  }
  public save() {
    try {
      fs.exists(this._filePath, (exist) => {
        if (!exist)
          throw new Error("System was unable to find the schedule file");
        fs.writeFile(this._filePath, "", { encoding: "utf-8" }, (err) => {
          if (err)
            throw new Error("System was unable to clear the schedule file.");
          fs.writeFile(this._filePath, this.generateSave(), { encoding: "utf-8" }, (err) => {
            if (err)
              throw new Error("System was unable to add content into the schedule file.");
          });
        });
      });
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  private setEvents(): void {
    process.on("beforeExit", (code) => {
      this.save();
    });
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
  public save(): void {
    
  }
  public delete(): void {
    
  }
  public update(body: any): void {
    if(body.scheduleID) this._value.scheduleID = body.scheduleID;
    if(body.userID) this._value.userID = body.userID;
    if(body.events) this._value.events = new WeekEvents(body.events, [1, 1, 1, 1, 1, 1, 1]);
  }
  public addEvent(name: string, day: Day, hours: TimeRange) {
    try {
      const totalHour: number = this._value.events.getTotalHour();
      if (!this._value.hasOverTime && (40 < totalHour + hours.getTotalHour()))
        throw new Error("This employee schedule doesn't allow over time.");
      this._value.events.addEvent(name, day, hours);
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
      events: new WeekEvents(body.events, [1, 1, 1, 1, 1, 1, 1]),
      hasOverTime: body.hasOverTime
    }
    return new Schedule(scheduleConstruct);
  }
  
  public static From = class {
    public static id(scheduleID: string): Schedule {
      
    }
  }
}