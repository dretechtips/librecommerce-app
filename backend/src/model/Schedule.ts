import { ScheduleConstructor, ScheduleBody } from "../interface/Schedule.inteface";
import { WeekEvents, SingleEvent, DayEvents } from "../type/Events";
import { TimeRange } from "../type/Range";
import uuid = require("uuid/v4");
import { Day } from "../interface/Events.interface";
import fs = require("fs");
import { ServerError } from "./Error";

const operation_hours = new TimeRange('9:00AM', '1:00PM');
const operation_event = new SingleEvent('[BUSINESS OPERATION]', operation_hours);
const operation_day = new DayEvents([operation_event], 1);
let operation_days = Array<DayEvents>(7);
operation_days = operation_days.map(cur => cur = operation_day);
export const operation_schedule: WeekEvents = new WeekEvents(operation_days);

export class ActiveSchedule
{
  private _schedule: Map<string, Schedule>;
  private _filePath: string;
  private _operation: WeekEvents;
  private _phase: "PHASE_1" | "PHASE_2" | "PHASE_3" | "PHASE_4";
  constructor() {
    this._schedule = new Map();
    this.import();
    this.setEvents();
    this._operation = operation_schedule;
    this.phaseSelect();
  }
  private phaseSelect(): void {
    try {
      const size: number = this._schedule.size;
      if (size >= 0 && size < 5)
        this._phase = "PHASE_1";
      else if (size >= 5 && size < 20)
        this._phase = "PHASE_2";
      else if (size >= 20 && size < 100)
        this._phase = "PHASE_3";
      else if (size >= 100 && size < 500)
        this._phase = "PHASE_4";
      else
        throw new ServerError("System wasn't designed to handle this number of employee.");
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  private import(): void {
    const schedules: Schedule[] | null = ScheduleManager.from.active(true);
    if(schedules)
      for (let i = 0; i < schedules.length; i++) {
        const cur: Schedule = schedules[i];
        this._schedule.set(cur.getID(), cur);
      }
  }
  /*
   * HR SHIFT TO DO 
   * 1) Create an employees tier system - Prioritize the better employee
   * 2) Create an employees prefered hour system - Give the better employee better hour
   * 3) Space out the employees evenly
   * Phase 1
   * Prerequsite: 0 - 5 Employees
   * - We need to 1 shipping / stocker at all time during these hours
   * - Don't need a developer.
   * - Don't need a manager.
   * Phase 2
   * Prerequesite: 5 - 20 Employees
   * - Employees - 1 =  Shipper / Stocker
   * - Don't need a developer
   * - 1 Store Manager
   * - Implement an HR staisfaction system to help predictions
   * Phase 3
   * Prerequestite: 20 - 100 Employees
   * Ratio
   * - 90 % stocker / shipper
   * - 5 % manager
   * - 5 % developer / engineer
   * Phase 4
   * Prerequestite: 100 Employees - 500 Employees
   * 
   */ 
  public HRshift(): void {
    // TODO
  }
  public delete(scheduleID: string): void {
    this._schedule.delete(scheduleID);
  }
  public save(): void {
    // Database Method
  }
  public get(scheduleID: string): Schedule | null {
    const schedule: Schedule | undefined = this._schedule.get(scheduleID);
    if (!schedule)
      return null;
    else
      return schedule;
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
      // Database Method
    }
    public static active(isActive: boolean): Schedule[] | null {
      // Database Method
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
  public getUserID(): string {
    return this._value.userID;
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