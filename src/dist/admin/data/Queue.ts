export abstract class Queue
{
  protected _values: any[];
  constructor(vals: any[])
  {
    this._values = vals;
  }
  enqueue(val: any)
  {
    this._values.push(val);
  }
  dequeue(): any
  {
    return this._values.pop()
  }
}