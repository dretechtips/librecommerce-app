import * as db from "database";

/**
 * @param Value  Private Value
 * @param IFull  Full Access Interface
 * @param IPart Partial Access Interface
 */
export abstract class Model<Value = {}, IFull = {}, IPart = {}> {
  protected _value: Value;
  constructor(collection: string) {}
  public find(id: string): void {}
  public add(): void {}
  public delete(): void {}
  public save(): void {}
  public update(data: Partial<IPart>): void {}
  public abstract toPrimObj(): IFull;
}

export default Model;
