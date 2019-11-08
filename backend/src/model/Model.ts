import * as db from 'database';
import { State, Props, IModel } from '../interface/Model.interface';
import uuid = require('uuid/v4');
import { StaticImplements } from '../decorator/Static.decorator';
import { PropSafe } from '../interface/Model.interface';

const model = new Model();

/**
 * @param S  State
 * @param I  Interface
 */
@StaticImplements<IModel>()
export abstract class Model<S = {}, I extends PropSafe = {}> {
  public static collection: string;
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
  public abstract toPrimObj(): Props<I>;
  public abstract fromPrimObj(struct: I): State<S>;
  public static search<S, I extends PropSafe, T extends Model<S, I>>(
    query: Partial<Props<I>>,
    type: { new (id: string): T }
  ): string[] {
    // Just get the id and pass it into the constructor of the type
    // 1. Pass the search query into the database search
    // 2. Get the id as an array
    // 3. Pass those id into the construcotor
    // 4. Return T
  }
}

export default Model;
