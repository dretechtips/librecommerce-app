import { Collection } from "mongodb";
import DatabaseScript from "./DatabaseScript";

export class DatabaseCollection<T> {
  private _collection: Collection<T>;
  private _script: DatabaseScript;
  constructor(collection: Collection, script: DatabaseScript) {
    this._collection = collection;
    this._script = script;
  }
  public script(): DatabaseScript {
    return this._script;
  }
  public switch<T>(collection: string): DatabaseCollection<T> {
    return this._script.switch<T>(collection);
  }
  public insert(data: T): DatabaseCollection<T> {
    this._script.append();
    return this;
  }
  public update(data: Partial<T>): DatabaseCollection<T> {
    this._script.append();
    return this;
  }
  public query(data: Partial<T>): DatabaseCollection<T> {
    this._script.append();
    return this;
  }
  public delete(data: Partial<T>): DatabaseCollection<T> {
    this._script.append();
    return this;
  }
}

export default DatabaseCollection;