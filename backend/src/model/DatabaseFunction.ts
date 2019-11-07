import {
  Search,
  SearchValue,
  Operation,
  DatabaseValue
} from '../interface/DatabaseFunction.interface';

export abstract class DatabaseFunction {
  private _db: any;
  private _collection: string;
  constructor(db: any, collection: string) {
    this._db = db;
    this._collection = collection;
  }
  public abstract async run(): Promise<void>;
}

export default DatabaseFunction;

export class Insert extends DatabaseFunction {
  private _value: DatabaseValue[] | DatabaseValue[][];
  constructor(
    db: any,
    collection: string,
    values: DatabaseValue[] | DatabaseValue[][]
  ) {
    super(db, collection);
  }
  async run(): Promise<void> {}
}

export class Find extends DatabaseFunction {
  constructor(db: any, collection: string) {
    super(db, collection);
  }
  async run(): Promise<void> {}
}

export class Update extends DatabaseFunction {
  constructor(db: any, collection: string) {
    super(db, collection);
  }
  async run(): Promise<void> {}
}

export class Delete extends DatabaseFunction {
  constructor(db: any, collection: string) {
    super(db, collection);
  }
  async run(): Promise<void> {}
}