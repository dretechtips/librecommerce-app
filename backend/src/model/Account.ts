import { IPAddress, Address } from '../type/Location';
import { Constructor } from '../interface/Account.interface';
import { Ban } from '../model/Ban';
import * as BanController from '../controller/Ban.controller';
import { Time } from '../type/Time';
import cron = require('node-cron');
import uuid = require('uuid/v4');
import { ClientError } from 'type/Error';

export abstract class Account {
  protected _value: Constructor;
  constructor(constructor: Constructor) {
    this._value = constructor;
  }
  public getIPs(): IPAddress[] {
    return this._value.associatedIPs;
  }
  public getName(): string {
    return this._value.firstName + ' ' + this._value.lastName;
  }
  public getID(): string {
    return this._value.id;
  }
  public getAddress(): Address {
    return this._value.address;
  }
  public ban(reason: string): Ban {
    const ban: Ban = new Ban(this.getID(), reason);
    ban.add();
    return ban;
  }
  public isPassword(password: string): boolean {
    return this._value.password.toString() == password;
  }
  public static search() {}
  /**
   *
   * @param id Account ID
   * @returns [Username] [Password]
   */
  public static decrypt(id: string): [string, string] | null {
    try {
      const buf: Buffer = Buffer.from(id, 'base64');
      const sID: string = buf.toString();
      const [username, password] = sID.split(':');
      if (!username || !password)
        throw new ClientError(
          'Username and password could not be derived from the id'
        );
      return [username, password];
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      return null;
    }
  }
}

export default Account;
