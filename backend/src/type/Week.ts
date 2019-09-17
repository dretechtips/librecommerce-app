import { WeekConstrutor, Day } from "../interface/Week.interface";

export class Week
{
  private _value: WeekConstrutor;
  constructor(week: WeekConstrutor) {
    this._value = this.search(week);
  }
  private search(week: WeekConstrutor): WeekConstrutor {
    const array: Day[] = [];
    const find: Day[] = ["mon", 'tues', "wed", "thur", "fri", "sat", "sun"];
    for (let i = 0; i < find.length; i++) {
      const found: Day = week.find((cur) => cur === find[i]);
      if (found)
        array.push(found);
      if (array.length === 7)
        break;
    }
    return array;
  }
}



