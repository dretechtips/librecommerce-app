//import { Pool, PoolConfig, PoolClient, QueryResult } from "pg";
import { MongoClient, Db } from 'mongodb';
import * as crypto from 'crypto';
import Time from '../type/Time';
import DatabaseScript from './DatabaseScript';
import { Encryption } from '../interface/Database.interface';

export class DatabaseConnection {
  private _db: Db;
  private _encrypt: Encryption | null;
  constructor(db: Db, key?: string, iv?: Buffer) {
    this._db = db;
    if (key && iv)
      this._encrypt = {
        key: key,
        iv: iv
      };
    else this._encrypt = null;
  }
  public script(): DatabaseScript {
    const script: DatabaseScript = new DatabaseScript(this._db);
    if (this._encrypt) script.encrypt(this._encrypt.key, this._encrypt.iv);
    return script;
  }
  public getEncrypt(): Encryption | null {
    return this._encrypt;
  }
}

export default DatabaseConnection;
