import { State, Props, IModel } from '../interface/Model.interface';
import uuid = require('uuid/v4');
import { StaticImplements } from '../decorator/Static.decorator';
import { PropSafe } from '../interface/Model.interface';
import * as db from 'database';

const DatabaseURL: URL = new URL('https://mongodb.com/3264728');
const DatabaseCryptoKey: string = 'jkaodaojdijdoasidjasdj';
const DatabaseCryptoIV: Buffer = new Buffer(82397828047047047234);
const DatabaseClient: db.Client = new db.Client(DatabaseURL).setEncryption(
  DatabaseCryptoKey,
  DatabaseCryptoIV
);

export const DatabaseSearch = async <
  I extends PropSafe,
  T extends Model<any, any, I>
>(
  collection: string,
  query: db.SearchQuery<Props<I>>
): Promise<string[]> => {
  const connection = DatabaseClient.db(collection);
  if (connection) {
    const result = await connection
      .script()
      .action<I>('model', action => {
        action.query(query);
      })
      .submit();
    return result.data[0].map<string>(cur => cur.id);
  } else return [];
};

export const DatabaseSearchIDs = async <
  I extends PropSafe,
  T extends Model<any, any, I>
>(
  collection: string,
  ids: string[]
): Promise<T> => {
  const connection = DatabaseClient.db(collection);
  const querys: db.SearchQuery<Props<I>>[] = ids.map<db.SearchQuery<Props<I>>>(
    id => ({ id } as db.SearchQuery<Props<I>>)
  );
  if (connection) {
    const result = await connection
      .script()
      .action<I>('model', action => {
        querys.forEach(query => action.query(query));
      })
      .submit();
    return result.data[0];
  } else return [];
};

/**
 * @typedef C  Constructor
 * @typedef S  State
 * @typedef I  Interface
 */
@StaticImplements<IModel>()
abstract class Model<C = {}, S = {}, I extends PropSafe = {}> {
  public static collection: string;
  public static database: string;
  private _value: State<S>;
  constructor() {
    this._value.id = uuid();
    this._value.timestamp = new Date();
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
  public async add(): Promise<void> {
    Model.getDB()
      .script()
      .append()
      .submit();
  }
  public async delete(): Promise<void> {
    Model.getDB()
      .script()
      .append()
      .submit();
  }
  public async save(): Promise<void> {
    Model.getDB()
      .script()
      .append()
      .submit();
  }
  public async update(data: Partial<I>): Promise<void> {
    Model.getDB()
      .script()
      .append()
      .submit();
  }
  public abstract toPrimObj(): Props<I>;
  public abstract fromPrimObj(struct: I): State<S>;
}

export default Model;
