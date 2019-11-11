import { Collection } from 'mongodb';
import DatabaseScript from './DatabaseScript';
import * as db from 'database';
import { DatabaseFunction } from './DatabaseFunction';

export class DatabaseAction<T = any> {
  private _procedures: DatabaseFunction[];
  private _collection: string;
  constructor(collection: string) {
    this._collection = collection;
  }
  public insert(data: T): this {
    this._procedures.push();
    return this;
  }
  public update(data: Partial<T>): this {
    this._procedures.push();
    return this;
  }
  public query<U extends keyof T>(data: db.SearchQuery<T>): this {
    this._procedures.push();
    return this;
  }
  public delete(data: Partial<T>): this {
    this._procedures.push();
    return this;
  }
  public procedures(): DatabaseFunction[] {
    return this._procedures;
  }
  public collection(): string {
    return this._collection;
  }
}

export default DatabaseAction;
