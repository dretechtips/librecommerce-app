export class Queue<T>
{
  protected _values: T[];
  constructor(vals?: T[])
  {
    if (typeof vals !== "undefined") {
      this._values = vals;
    }
    else {
      this._values = [];
    }
  }
  enqueue(val: T)
  {
    this._values.push(val);
  }
  dequeue(): T
  {
    return this._values.pop();
  }
}