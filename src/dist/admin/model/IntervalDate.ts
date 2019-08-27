import { Week } from "../interface/Week.interface";

export class IntervalDate
{
  week: Week
  constructor(week: Week)
  {
    this.setDate(week);
  }
  public setDate(week: Week): void
  {
    this.week.mon = week.mon;
    this.week.tues = week.tues;
    this.week.wed = week.wed;
    this.week.thurs = week.thurs;
    this.week.fri = week.fri;
    this.week.sat = week.sat;
    this.week.sun = week.sun;
  }
  public toWeek(): Week
  {
    return this.week;
  }
  
  public setAllDateTrue(): void
  {
    const WeekProp = Object.keys(this.week);
    for(let i = 0 ; i < WeekProp.length ; i++)
    {
      this.week[WeekProp[i]] = true;
    }
  }
  public setAllDateFalse(): void
  {
    const WeekProp = Object.keys(this.week);
    for(let i = 0 ; i < WeekProp.length ; i++)
    {
      this.week[WeekProp[i]] = false;
    }
  }
  public setWeekDateTrueOnly(): void
  {
    const WeekProp = Object.keys(this.week);
    for(let i = 0 ; i < WeekProp.length ; i++)
    {
      if(!(WeekProp[i] === "sun") || !(WeekProp[i] === "sat"))
      {
        this.week[WeekProp[i]] = true;
      }
      else
      {
        this.week[WeekProp[i]] = false;
      }
    }
  }
  public setWeekEndTrueOnly(): void
  {
    const WeekProp = Object.keys(this.week);
    for(let i = 0 ; i < WeekProp.length ; i++)
    {
      if(!(WeekProp[i] === "sun") || !(WeekProp[i] === "sat"))
      {
        this.week[WeekProp[i]] = false;
      }
      else
      {
        this.week[WeekProp[i]] = true;
      }
    }
  }
  public setOddDateTrueOnly(): void
  {
    this.week.sun = false;
    this.week.mon = true;
    this.week.tues = false;
    this.week.wed = true;
    this.week.thurs = false;
    this.week.fri = true;
    this.week.sat = false;
  }
  public setEvenDateTrueOnly(): void
  {
    this.week.sun = true;
    this.week.mon = false;
    this.week.tues = true;
    this.week.wed = false;
    this.week.thurs = true;
    this.week.fri = false;
    this.week.sat = true;
  }
}