import { MongoClient } from 'mongodb';
import DatabaseConnection from './DatabaseConnection';
import DatabaseScript from './DatabaseScript';
import { DatabaseError } from '../type/Error';
import { Encryption } from 'database';

export class DatabaseClient {
  private _client: MongoClient;
  private _start: Date;
  private _encrypt: Encryption | null;
  constructor(url: URL) {
    this._client = new MongoClient(url.toJSON());
    this._start = new Date();
    this._encrypt = null;
    this.connect(url.toJSON());
  }
  public isConnected = this._client.isConnected;
  public setEncryption(key: string, iv: Buffer) {
    this._encrypt = {
      key,
      iv
    };
    return this;
  }
  private async connect(url: string) {
    await this._client.connect();
    return this;
  }
  public db(
    name: string,
    key?: string,
    iv?: Buffer
  ): DatabaseConnection | null {
    try {
      if (this.isConnected()) {
        if (key && iv) {
          return new DatabaseConnection(this._client.db(name), key, iv);
        } else if (this._encrypt) {
          return new DatabaseConnection(
            this._client.db(name),
            this._encrypt.key,
            this._encrypt.iv
          );
        } else {
          return new DatabaseConnection(this._client.db(name));
        }
      } else
        throw new DatabaseError(
          'Database could not return an active connection.'
        );
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      return null;
    }
  }
}

export default DatabaseClient;
