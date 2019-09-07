import { Pool, PoolConfig, PoolClient, QueryResult } from "pg";
import * as crypto from "crypto";
import { default as hconsole } from "./Console";
import { DatabaseQueryConstructor, column, DatabaseKeyValue } from "../interface/Database.interface";

export class Database 
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
  static arrayToSqlArray(array: DatabaseKeyValue[1][]): string
  {
    let value = "";
    for(let i = 0 ; i < array.length ; i++)
    {
      const cur = array[i];
      if(typeof cur === "string")
      {
        value += `'${cur}', `;
      }
      else if (typeof cur === "number" || typeof cur === "boolean")
      {
        value += `${cur}, `;
      }
    }
    return `ARRAY[${value.substring(0, value.length - 2)}]`;
  }
  public static arrayToSetVal(array: DatabaseKeyValue[])
  {
    let value = "";
    for(let  i = 0 ; i < array.length ; i++)
    {
      const cur = array[i];
      if(typeof cur[1] === "string")
      {
        value += `${cur[0]} = '${cur[1]}, '`;
      }
      else if(typeof cur[1] === "number" || typeof cur[1] === "boolean")
      {
        value += `${cur[0]} = ${cur[1]}, `;
      }
    }
    return value.substring(0, value.length - 2) + " ";
  }
  static _db = {
    main: new Database('main', 'postgres', 'pass', 'dadadavhividasvii3213', '42342789890543'),
  }
};

export default Database;

export class DatabaseQuery
{
  private _main: string;
  private _condition: string;
  private _query: DatabaseQueryConstructor;

  constructor(query: DatabaseQueryConstructor)
  {
    this._query = query;
  }
  private validateColumn(col: column[]): boolean
  {
    for(let i = 0 ; i < col.length ; i++)
    {
      const cur = col[i][0];
      if(!this._query.col.find((el) => el === cur))
      {
        return false;
      }
    }
    return true;
  }
  private valueArrayToInsertVal(values: DatabaseKeyValue[])
  {
    let col: string;
    let val: string;
    for(let  i = 0 ; i < values.length ; i++)
    {
      const value: string | boolean | number = values[i][1];
      if(typeof value === "string")
      {
        col += values[i][0] + ", ";
        val += `'${value}', `;
      }
      else
      {
        col += values[i][0] + ", ";
        val += `${value}, `;
      }
    }
    return `(${col.substring(0, col.length - 2)}) VALUES (${val.substring(0, col.length - 2)})`;
  }
  private valuesToColumn(values: DatabaseKeyValue[])
  {
    let columns: column[] = [];
    for(let val in values)
    {
      columns.push(val[0]);
    }
    return columns;
  }
  public toSQLQuery(): string
  {
    return this._main + this._condition;
  }
  public insert(values: DatabaseKeyValue[]): DatabaseQuery
  {
    try {
      const columns: column[] = this.valuesToColumn(values);
      const isValid: boolean = this.validateColumn(columns);
      if(!isValid) throw Error("Cannot INSERT data into non-valid column");
      this._main = `INSERT INTO ${this._query.schema + '.' + this._query.table} ${this.valueArrayToInsertVal}`;
      return this;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public select(column: column[]) : DatabaseQuery
  {
    try {
      const isValid: boolean = this.validateColumn(column);
      if(!isValid) throw new Error("Cannot SELECT data from non-valid column");
      if(column[0] === "*" && column.length === 0)
      {
        this._main = `SELECT * FROM ${this._query.schema + '' + this._query.table}`;
      }
      else
      {
        this._main = `SELECT (${Database.arrayToSqlArray(column)}) FROM ${this._query.schema + this._query.table}`;
      }
      return this;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public update(values: DatabaseKeyValue[], condition: string): DatabaseQuery
  {
    try {
      const column: column[] = this.valuesToColumn(values);
      const isValid: boolean = this.validateColumn(column);
      if(!isValid) throw new Error("Unable to UPDATE WHERE " + condition + " becuase columns aren't valid");
      this._main = `UPDATE ${this._query.table} SET ${Database.arrayToSetVal(values)}`;
      this._condition = `WHERE ${condition}`;
      return this;
    } catch (e) {
      const ex: Error = e;
      hconsole.log(ex.message);
    }
  }
  public delete(values: DatabaseKeyValue[]): DatabaseQuery
  {
    try {
      const column: column[] = this.valuesToColumn(values);
      const isValid: boolean = this.validateColumn(column);
      if(!isValid) throw new Error("Unable to DELETE item from " + this._query.table);
      this._main += `DELETE FROM ${this._query.table}`;
      this._condition += `WHERE ${condition}`;
      return this;
    } catch (e) {
      const ex: Error = e;
      hconsole.log(ex.message);
    }
  }
}
