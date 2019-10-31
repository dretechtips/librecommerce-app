export class Queue<T> {
  protected _values: T[];
  constructor(vals?: T[]) {
    if (vals) {
      this._values = vals;
    } else {
      this._values = [];
    }
  }
  public enqueue(val: T) {
    this._values.push(val);
  }
  public dequeue(): T | null {
    const val = this._values.pop();
    return val ? val : null;
  }
  public getValues(): T[] {
    return this._values;
  }
}

export default Queue;
