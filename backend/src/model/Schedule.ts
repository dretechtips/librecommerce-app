import Mongoose from "mongoose";
import {
  UserScheduleCompileType,
  ScheduleDayEvent,
  ScheduleWeekEvent,
  UserScheduleTrackerCompileType
} from "../interface/Schedule.inteface";
import Model from "../factory/Model";

export const ScheduleDayEventCompileType: Mongoose.TypedSchemaDefinition<ScheduleDayEvent> = {
  events: [
    {
      name: String,
      start: String,
      end: String,
      description: String
    }
  ]
};

export const ScheduleWeekEventCompileType: Mongoose.TypedSchemaDefinition<ScheduleWeekEvent> = {
  monday: ScheduleDayEventCompileType,
  tuesday: ScheduleDayEventCompileType,
  wednesday: ScheduleDayEventCompileType,
  thursday: ScheduleDayEventCompileType,
  friday: ScheduleDayEventCompileType,
  saturday: ScheduleDayEventCompileType,
  sunday: ScheduleDayEventCompileType
};

const UserScheduleTrackerRuntimeType: Mongoose.TypedSchemaDefinition<UserScheduleTrackerCompileType> = {
  month: Number,
  year: Number,
  calander: [ScheduleDayEventCompileType],
  userID: String
};

const UserScheduleTrackerSchema = new Mongoose.Schema<
  UserScheduleTrackerCompileType
>(UserScheduleTrackerRuntimeType);

export class UserScheduleTracker extends Model(
  "User Schedule Tracker",
  UserScheduleTrackerSchema
) {
  public async validate() {
    super.validate();
    const month = this.data().month;
    const year = this.data().year;
    if (new Date(year, month, 0).getDate() !== this.data().calander.length)
      throw new Error(
        "System cannot store a calander with the wrong amount of days"
      );
  }
}

const UserScheduleRuntimeType: Mongoose.TypedSchemaDefinition<UserScheduleCompileType> = {
  preset: ScheduleWeekEventCompileType,
  canOverTime: Boolean
};

const UserScheduleSchema = new Mongoose.Schema(UserScheduleRuntimeType);

export class UserSchedule extends Model("User Schedule", UserScheduleSchema) {
  public getCompletedScheduleTracked(month: number, year: number) {
    if (month < 0 || month > 11)
      throw new Error("Months only go from Jan - Dec");
    if (year < 1970 || year > 3000)
      throw new Error("Years should only go from 1970 - 3000");
    // Call TrackedScheduleAPI
  }
}

// const operation_hours = new TimeRange('9:00AM', '1:00PM');
// const operation_event = new SingleEvent(
//   '[BUSINESS OPERATION]',
//   operation_hours
// );
// const operation_day = new DayEvents([operation_event], 1);
// const operation_days = Array<DayEvents>(7).fill(operation_day);
// export const operation_schedule: WeekEvents = new WeekEvents(operation_days);

// export class ActiveSchedule {
//   private _schedule: Map<string, Schedule>;
//   private _filePath: string;
//   private _operation: WeekEvents;
//   private _phase: 'PHASE_1' | 'PHASE_2' | 'PHASE_3' | 'PHASE_4';
//   constructor() {
//     this._schedule = new Map();
//     this.import();
//     this.setEvents();
//     this._operation = operation_schedule;
//     this.phaseSelect();
//   }
//   private phaseSelect(): void {
//     try {
//       const size: number = this._schedule.size;
//       if (size >= 0 && size < 5) this._phase = 'PHASE_1';
//       else if (size >= 5 && size < 20) this._phase = 'PHASE_2';
//       else if (size >= 20 && size < 100) this._phase = 'PHASE_3';
//       else if (size >= 100 && size < 500) this._phase = 'PHASE_4';
//       else
//         throw new ServerError(
//           "System wasn't designed to handle this number of employee."
//         );
//     } catch (e) {
//       const ex: Error = e;
//       hconsole.error(ex);
//     }
//   }
//   private import(): void {
//     const schedules: Schedule[] | null = ScheduleManager.from.active(true);
//     if (schedules)
//       for (let i = 0; i < schedules.length; i++) {
//         const cur: Schedule = schedules[i];
//         this._schedule.set(cur.getID(), cur);
//       }
//   }
//   /*
//    * HR SHIFT TO DO
//    * 1) Create an employees tier system - Prioritize the better employee
//    * 2) Create an employees prefered hour system - Give the better employee better hour
//    * 3) Space out the employees evenly
//    * Phase 1
//    * Prerequsite: 0 - 5 Employees
//    * - We need to 1 shipping / stocker at all time during these hours
//    * - Don't need a developer.
//    * - Don't need a manager.
//    * Phase 2
//    * Prerequesite: 5 - 20 Employees
//    * - Employees - 1 =  Shipper / Stocker
//    * - Don't need a developer
//    * - 1 Store Manager
//    * - Implement an HR staisfaction system to help predictions
//    * Phase 3
//    * Prerequestite: 20 - 100 Employees
//    * Ratio
//    * - 90 % stocker / shipper
//    * - 5 % manager
//    * - 5 % developer / engineer
//    * Phase 4
//    * Prerequestite: 100 Employees - 500 Employees
//    *
//    */

//   public HRshift(): void {
//     // TODO
//   }
//   public delete(scheduleID: string): void {
//     this._schedule.delete(scheduleID);
//   }
//   public save(): void {
//     // Database Method
//   }
//   public get(scheduleID: string): Schedule | null {
//     const schedule: Schedule | undefined = this._schedule.get(scheduleID);
//     if (!schedule) return null;
//     else return schedule;
//   }
//   public add(schedule: Schedule): void {
//     this._schedule.set(schedule.getID(), schedule);
//   }
//   private setEvents(): void {
//     process.on('beforeExit', () => {
//       this.save();
//     });
//   }
// }
