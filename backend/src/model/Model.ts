import * as db from 'database';
import { State, Props, IModel } from '../interface/Model.interface';
import uuid = require('uuid/v4');
import { StaticImplements } from '../decorator/Static.decorator';
import { PropSafe } from '../interface/Model.interface';

interface TestUnit {
  name: string;
  value: boolean;
}

/**
 * @param S  State
 * @param I  Interface
 */
function Model<S = {}, I extends PropSafe = {}>() {
  @StaticImplements<IModel>()
  abstract class Model {
    public static collection: string;
    public static database: string;
    private static client: db.Client = new db.Client(
      new URL('https://mongodb.com/3264728')
    ).setEncryption('njonadnasdnoad', new Buffer(34274847298478234));
    private static connection(): db.Connection | null {
      return this.client.db(this.collection);
    }
    /**
     * @returns Model IDs
     */
    public static async search(
      query: db.SearchQuery<Props<I>>
    ): Promise<string[]> {
      const connection = await this.connection();
      if (connection) {
        const result = await connection
          .script()
          .action<I>('model', action => {
            action.query(query);
          })
          .submit();
        return result.data[0].map<string>(cur => cur.id);
      } else return [];
    }
    public static async searchID(ids: string[]): Promise<Model[]> {
      const connection = await this.connection();
      const querys: db.SearchQuery<Props<I>>[] = ids.map<
        db.SearchQuery<Props<I>>
      >(id => ({ id } as db.SearchQuery<Props<I>>));
      if (connection) {
        const result = await connection
          .script()
          .action<I>('model', action => {
            querys.forEach(query => action.query(query));
          })
          .submit();
        return result.data[0];
      } else return [];
    }
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
    public add(): void {
      Model.getDB()
        .script()
        .append()
        .submit();
    }
    public delete(): void {
      Model.getDB()
        .script()
        .append()
        .submit();
    }
    public save(): void {
      Model.getDB()
        .script()
        .append()
        .submit();
    }
    public update(data: Partial<I>): void {
      Model.getDB()
        .script()
        .append()
        .submit();
    }
    public abstract toPrimObj(): Props<I>;
    public abstract fromPrimObj(struct: I): State<S>;
  }
  return Model;
}

export default Model;
