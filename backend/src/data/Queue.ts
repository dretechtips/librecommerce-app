export class Queue<T>
{
  protected _values: T[];
  constructor(vals?: T[])
  {
    if (vals !== undefined || vals !== null) {
      this._values = vals;
    }
    else {
      this._values = [];
    }
  }
  public enqueue(val: T)
  {
    this._values.push(val);
  }
  public dequeue(): T
  {
    return this._values.pop();
  }
  public getValues(): T[] {
    return this._values;
  }
}