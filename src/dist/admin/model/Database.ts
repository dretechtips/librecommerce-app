import { Pool, PoolConfig, PoolClient, QueryResult } from "pg";
import * as crypto from "crypto";
import { default as hconsole } from "../model/Console";
import { DatabaseQueryConstructor, column } from "../interface/Database.interface";

class Database 
{
  private name: string; 
  private user: string;
  private pass: string;
  private pool: Pool;
  private key: string;
  private iv: string;
  private pgOption: PoolConfig;
  constructor(name: string, user: string, pass: string, key: string, iv: string)
  {
    this.name = name;
    this.user = user;
    this.pass = pass;
    this.key = key;
    this.iv = iv;
    this.pgOption = {
      host: '127.0.0.1',
      user: this.user,
      password: this.pass,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }
    this.pool = new Pool(this.pgOption);
  }
  encrypt(msg: string): string
  {
    const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-ccm', this.key, this.iv);
    let encrypted = cipher.update(msg, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  decrypt(eMsg: string): string
  {
    const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-ccm', this.key, this.iv);
    let decrypted = decipher.update(eMsg, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  stop(): boolean
  {
    try {
      this.pool.end();
      hconsole.log("Pool connection is ending!");
      return true;
    } catch (e) {
      return false;
    }
    
  }
  async singleQuery(query: string) : Promise<QueryResult>
  {
    const client: PoolClient = await this.pool.connect();
    const result: QueryResult = await client.query(query);
    client.release();
    return result;
  }
  static arrayToSqlArray(array: Array<string>): string
  {
    const SQLStrings: string[] = array.map(cur =>
      {
        let newCur: string[]= Array.from(cur);
        newCur.unshift('\'');
        newCur.push('\'');
        return newCur.toString();
      }
    );
    return `ARRAY[${SQLStrings.join()}]`;
  }
  static _db = {
    main: new Database('main', 'postgres', 'pass', 'dadadavhividasvii3213', '42342789890543'),
  }
};

export class DatabaseQuery
{
  private _main: string;
  private _condition: string;
  private _query: DatabaseQueryConstructor;

  constructor(query: DatabaseQueryConstructor)
  {
    this._query = query;
  }
  public toSQLQuery(): string
  {
    return this._main;
  }
  private insert(values: string[]): DatabaseQuery
  {
    const col: column[] = this._query.col;
    const table: string = this._query.table;
    const schema: string = this._query.schema;
    this._main += `INSERT INTO ${schema + '.' + table} (${col.join(',')}) VALUES (${values.join(',')})`;
    return this;
  }
  private select(column: column[]) : DatabaseQuery
  {
    if(column[0] === "*" && column.length === 0)
    {
      this._main += `SELECT * FROM ${this._query.schema + '' + this._query.table}`;
    }
    else
    {
      this._main += `SELECT (${Database.arrayToSqlArray(column)}) FROM ${this._query.schema + this._query.table}`;
    }
    return this;
  }
  private update(value: string[]): DatabaseQuery
  {
    
    return this;
  }
  private delete(): DatabaseQuery
  {
    return this;
  }
}

export default Database;
