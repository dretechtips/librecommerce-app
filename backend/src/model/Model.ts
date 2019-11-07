import * as db from "database";
import { State, Props } from "../interface/Model.interface";
import uuid = require("uuid/v4");

/**
 * @param S  State
 * @param I  Interface
 */
export abstract class Model<S = {}, I = {}> {
  protected static collection: string;
  private _value: State<S>;
  constructor(id?: string) {
    if (id) {
      const struct: I = this.find(Model.collection, id);
      const value: State<S> = this.fromPrimObj(struct);
      this._value = value;
    } else {
      this._value.id = uuid();
      this._value.timestamp = new Date();
    }
  }
  private find(collection: string, id: string): I {
    /**
     *  1. Get JSON from MongoDB
     *  2. Convert JSON into interface object
     *  3. Return
     */
  }
  protected state(): State<S> {
    return {
      ...this._value
    };
  }
  protected setState(value: S) {
    this._value = {
      ...this.state(),
      ...value
    };
  }
  public getID(): string {
    return this.state().id;
  }
  public add(): void {}
  public delete(): void {}
  public save(): void {}
  public update(data: Partial<I>): void {}
  public abstract toPrimObj(): I;
  public abstract fromPrimObj(struct: I): State<S>;
  public static search(query: string) {
    // Call database collection using collection name
    // Query the database based off param
  }
}

export default Model;
