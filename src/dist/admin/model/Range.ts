import hconsole from "./Console";

export class TimeRange
{
  private _timezone;
  private _start;
  private _end;
  private _startMeridiem;
  private _endMeridiem;
  constructor(start: string, end: string)
  {
    try
    {
      
    }
    catch(e)
    {
      
    }
  }
  public static Builder = class
  {
    public Morning(): TimeRange
    {
      const timeA: string = '6:00';
      const timeB: string = '12:00';
      return new TimeRange(timeA, timeB);
    }
    public Afternoon(): TimeRange
    {
      const timeA: string = '12:00';
      const timeB: string = '18:00';
      return new TimeRange(timeA, timeB);
    }
    public Evening(): TimeRange
    {
      const timeA: string = '18:00';
      const timeB: string = '24:00';
      return new TimeRange(timeA, timeB);
    }
    public Night(): TimeRange
    {
      const timeA: string = '24:00';
      const timeB: string = '6:00';
      return new TimeRange(timeA, timeB);
    }
  }
  private setTime(timeA: string, timeB: string): boolean
  {
    if(this.searchMerd(timeA) && this.searchMerd(timeB))
    {
      this._start = this.parseStrToTime(timeA);
      this._end = this.parseStrToTime(timeB);
      this._startMeridiem;
    }
    else if (this.searchMerd(timeA) || this.searchMerd(timeB))
    {
      return false;
    }
    else
    {
      
    }
  }
  private parseStrToTime(time: string): [string, 'AM' | 'PM']
  {
    try
    {
      const aTime: string[] = time.split(':');
      const hour: number = parseInt(aTime[0]);
      if(hour > 24 && hour < 0) throw Error("Hour cannot be greater than 24 and less than 0");
      const minute: number = parseInt(aTime[1]);
      if(minute > 60 && minute < 0) throw Error("Minute cannot be greater than 60 and less than 0");
      if(hour < 12)
      {
        return [`${hour}:${minute}`, 'AM'];
      }
      else if(hour < 24)
      {
        return [`${hour}:${minute}`, 'AM'];
      }
    }
    catch(e)
    {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  private parseStrMerdToTime(time: string): [string, 'AM' | 'PM']
  {
    try {
      
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  private searchMerd(time: string): boolean
  {
    const query: string[] = ['am', 'pm', 'AM', 'PM'];
    let val: string = '';
    for(let cur in query)
    {
      if(time.search(cur))
      {
        return true;
      }
    }
    return false;
  }
  private setMerd(time: string): boolean
  {
  
  }
  public getTime()
  {
    
  }
  public getTimeConverted()
  {
    
  }
}

enum TimeRangeTimeZone
{
  HST,
  AKDT,
  PDT,
  MST,
  MDT,
  CDT,
  EDT,
}