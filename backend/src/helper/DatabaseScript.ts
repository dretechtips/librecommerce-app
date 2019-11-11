import {
  Search,
  Value,
  Operation,
  Result,
  Encryption,
  ActionCallback
} from '../interface/Database.interface';
import { DatabaseFunction } from './DatabaseFunction';
import DatabaseAction from './DatabaseAction';
import { MongoClient, Db, Collection } from 'mongodb';

export class DatabaseScript {
  private _result: Result;
  private _actions: DatabaseAction[];
  private _database: Db;
  private _encrypt: Encryption | null;
  constructor(database: Db) {
    this._database = database;
    this._encrypt = null;
    this._actions = [];
  }
  public encrypt(key: string, iv: Buffer): DatabaseScript {
    this._encrypt = {
      key,
      iv
    };
    return this;
  }
  /**
   * @typedef U Collection Schema
   * @param collection Collection Name
   */
  public action<U>(
    collection: string,
    callback: (actions: DatabaseAction<U>) => void
  ) {
    const action: DatabaseAction<U> = new DatabaseAction<U>(collection);
    callback(action);
    this._actions.push(action);
    return this;
  }
  public async submit(): Promise<Result> {
    await this._procedure.forEach(cur => cur.run());
    return this._result;
  }
  public getResult(): Result {
    return this._result;
  }
  // public addDataType<U>(): DatabaseScript<T & { [Key in Keys]: string }> {
  //   const script = new DatabaseScript<T & { [Key in Keys]: string }>(
  //     this._database
  //   );
  //   if (this._encrypt) script.encrypt(this._encrypt.key, this._encrypt.iv);
  //   this._procedure.forEach(cur => script._procedure.push(cur));
  //   return script;
  // }
}

export default DatabaseScript;
