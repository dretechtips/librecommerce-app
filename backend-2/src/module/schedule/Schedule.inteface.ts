import Mongoose from "mongoose";

export interface ScheduleSingleEvent {
  name: string;
  start: string;
  end: string;
  description: string;
}

export interface ScheduleDayEvent {
  events: ScheduleSingleEvent[];
}

export interface ScheduleWeekEvent {
  monday: ScheduleDayEvent;
  tuesday: ScheduleDayEvent;
  wednesday: ScheduleDayEvent;
  thursday: ScheduleDayEvent;
  friday: ScheduleDayEvent;
  saturday: ScheduleDayEvent;
  sunday: ScheduleDayEvent;
}

export interface ScheduleTracker {
  month: number;
  year: number;
  calander: ScheduleDayEvent[];
}

export interface UserScheduleTrackerCompileType extends ScheduleTracker {
  userID: string;
}

export interface UserScheduleCompileType {
  preset: ScheduleWeekEvent;
  canOverTime: boolean;
}
