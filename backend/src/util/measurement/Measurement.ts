export abstract class Measurement<T extends Object> {
  protected abstract convert: { [C in keyof T]: number };
  protected abstract base: T[keyof T];
  public table: Map<string, number>;
  constructor(value: number, unit: keyof T) {
    this.table = new Map();
  }
  public convertTo(unit: keyof T) {
    return this.table.get(unit as string);
  }
}

export default Measurement;
