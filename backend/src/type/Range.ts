export class TimeRange {
  private _timezone;
  private _start;
  private _end;
  private _startMeridiem;
  private _endMeridiem;
  constructor(start: string, end: string) {
    try {
    } catch (e) {}
  }
  public static Builder = class {
    public Morning(): TimeRange {
      const timeA: string = '6:00';
      const timeB: string = '12:00';
      return new TimeRange(timeA, timeB);
    }
    public Afternoon(): TimeRange {
      const timeA: string = '12:00';
      const timeB: string = '18:00';
      return new TimeRange(timeA, timeB);
    }
    public Evening(): TimeRange {
      const timeA: string = '18:00';
      const timeB: string = '24:00';
      return new TimeRange(timeA, timeB);
    }
    public Night(): TimeRange {
      const timeA: string = '24:00';
      const timeB: string = '6:00';
      return new TimeRange(timeA, timeB);
    }
  };
  private setTime(timeA: string, timeB: string): boolean {
    if (this.searchMerd(timeA) && this.searchMerd(timeB)) {
      this._start = this.parseStrToTime(timeA);
      this._end = this.parseStrToTime(timeB);
      this._startMeridiem;
    } else if (this.searchMerd(timeA) || this.searchMerd(timeB)) {
      return false;
    } else {
    }
  }
  private parseStrToTime(time: string): [string, 'AM' | 'PM'] {
    try {
      const aTime: string[] = time.split(':');
      const hour: number = parseInt(aTime[0]);
      if (hour > 24 && hour < 0)
        throw Error('Hour cannot be greater than 24 and less than 0');
      const minute: number = parseInt(aTime[1]);
      if (minute > 60 && minute < 0)
        throw Error('Minute cannot be greater than 60 and less than 0');
      if (hour < 12) {
        return [`${hour}:${minute}`, 'AM'];
      } else if (hour < 24) {
        return [`${hour}:${minute}`, 'AM'];
      }
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  private parseStrMerdToTime(time: string): [string, 'AM' | 'PM'] {
    try {
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  private searchMerd(time: string): boolean {
    const query: string[] = ['am', 'pm', 'AM', 'PM'];
    let val: string = '';
    for (let cur in query) {
      if (time.search(cur)) {
        return true;
      }
    }
    return false;
  }
  private setMerd(time: string): boolean {}
  public getStartTime(): string {
    return this._start + this._startMeridiem;
  }
  public getEndTime(): string {
    return this._end + this._endMeridiem;
  }
  public getTimeConverted() {}
  public getTotalHours(): number {}
}

enum TimeRangeTimeZone {
  HST,
  AKDT,
  PDT,
  MST,
  MDT,
  CDT,
  EDT
}

export class DateRange {
  private _dateA: Date;
  private _dateB: Date;
  constructor(dateA: Date, dateB: Date) {
    this._dateA = dateA;
    this._dateB = dateB;
  }
  static Builder = class {
    private static dateRangeFromNow(days: number): DateRange {
      const [dateA, dateB] = [new Date(), DateRange.addDays(days)];
      return new DateRange(dateA, dateB);
    }
    public static OneDayFromNow(): DateRange {
      return this.dateRangeFromNow(1);
    }
    public static OneWeekFromNow(): DateRange {
      return this.dateRangeFromNow(7);
    }
    public static OneMonthFromNow() {
      return this.dateRangeFromNow(30);
    }
    public static SixMonthFromNow() {
      return this.dateRangeFromNow(182);
    }
    public static OneYearFromNow() {
      return this.dateRangeFromNow(365);
    }
  };
  public getStartDate(): Date {
    return this._dateA;
  }
  public getEndDate(): Date {
    return this._dateB;
  }
  public toString(): string {
    return (
      this._dateA.toLocaleDateString('en-US') +
      ', ' +
      this._dateB.toLocaleDateString('en-US')
    );
  }
  public toStringArray(): [string, string] {
    return [
      this._dateA.toLocaleDateString('en-US'),
      this._dateB.toLocaleDateString('en-US')
    ];
  }
  public static addDays(days: number) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  public offset(days: number, type: '+' | '-'): DateRange {
    if (type === '+') {
      this.offsetPositive(days);
    } else if (type === '-') {
      this.offsetNegative(days);
    }
    return this;
  }
  public shift(days: number): DateRange {
    this._dateA.setDate(this._dateA.getDate() + days);
    return this;
  }
  public pop(days: number): DateRange {
    this._dateB.setDate(this._dateA.getDate() - days);
    return this;
  }
  private offsetPositive(days: number) {
    this._dateA.setDate(this._dateA.getDate() + days);
    this._dateB.setDate(this._dateA.getDate() + days);
  }
  private offsetNegative(days: number) {
    this._dateA.setDate(this._dateA.getDate() - days);
    this._dateB.setDate(this._dateA.getDate() - days);
  }
}
