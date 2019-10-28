type UNITS = "s" | "ms" | "h" | "d" | "m";

export class Time {
  private _amount: number;
  private _unit: UNITS;
  constructor(amount: number, unit: UNITS) {
    this._amount = amount;
    this._unit = unit;
  }
  private convertToMS(): void {
    switch (this._unit) {
      case "s":
        this._amount *= 1000;
        break;
      case "m":
        this._amount *= 1000 * 60;
        break;
      case "h":
        this._amount *= 1000 * 60 * 60;
        break;
      case "d":
        this._amount *= 1000 * 60 * 60 * 24;
        break;
    }
    this._unit = "ms";
    return;
  }
  private convertFromMSTo(unit: UNITS) {
    this.convertToMS();
    switch (unit) {
      case "s":
        this._amount /= 1000;
        break;
      case "m":
        this._amount /= 1000 * 60;
        break;
      case "h":
        this._amount /= 1000 * 60 * 60;
        break;
      case "d":
        this._amount /= 1000 * 60 * 60 * 24;
        break;
    }
    this._unit = unit;
  }
  public toMilliSeconds(): Time {
    this.convertFromMSTo("ms");
    return this;
  }
  public toSeconds(): Time {
    this.convertFromMSTo("s");
    return this;
  }
  public toMinutes(): Time {
    this.convertFromMSTo("m");
    return this;
  }
  public toHours(): Time {
    this.convertFromMSTo("h");
    return this;
  }
  public toDays(): Time {
    this.convertFromMSTo("d");
    return this;
  }
  public getAmount(): number {
    return this._amount;
  }
  public getUnits(): UNITS {
    return this._unit;
  }
}

export default Time;