//import { Pool, PoolConfig, PoolClient, QueryResult } from "pg";
import { MongoClient, Db } from "mongodb";
import * as crypto from "crypto";
import Time from "../type/Time";
import DatabaseScript from "./DatabaseScript";

module "database" {

}

export class Database {
  private _db: Db;
  private _iv: Buffer;
  private _key: string;
  constructor(db: Db, key: string, iv: Buffer) {
    this._db = db;
  }
  public script(): DatabaseScript {
    return new DatabaseScript(this._db, this._key, this._iv);
  }
}

export default Database;