import { MongoClient } from "mongodb";
import Database from "./Database";

export class DatabaseClient {
  private _client: MongoClient;
  private _start: Date;
  constructor(url: URL) {
    this.connect(url.toJSON());
    this._start = new Date();
  }
  public async connect(url: string) {
    this._client = await this._client.connect();
  }
  public db(name: string, key: string, iv: Buffer) {
    return new Database(this._client.db(name), key, iv);
  };
}

export default DatabaseClient;