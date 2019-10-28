import { Search, SearchValue, Operation, SearchResult } from "../interface/DatabaseFunction.interface";
import DatabaseFunction from "./DatabaseFunction";
import DatabaseCollection from "./DatabaseCollection";
import { MongoClient, Db, Collection, } from "mongodb";

export class DatabaseScript {
  private _result: SearchResult;
  private _procedure: DatabaseFunction[];
  private _database: Db;
  private _encrypt: boolean;
  private _key: string;
  private _iv: Buffer;
  constructor(database: Db, key: string, iv: Buffer) {
    this._database = database;
    this._encrypt = true;
    this._key = key;
    this._iv = iv;
  }
  public encrypt(enable: boolean): DatabaseScript {
    this._encrypt = enable;
    return this;
  }
  public switch<T>(collection: string): DatabaseCollection<T> {
    return new DatabaseCollection<T>(this._database.collection<T>(collection), this);
  }
  public async submit(): Promise<void> {
    this._procedure.forEach(cur => cur.run());
  }
  public result(): SearchResult {
    return this._result;
  }
  public append(func: DatabaseFunction) {
    this._procedure.push(func);
  }
}

export default DatabaseScript;