import { IPAddress, Address } from '../type/Location';
import { IAccount } from '../interface/Account.interface';
import { Ban } from '../model/Ban';
import * as BanController from '../controller/Ban.controller';
import { Time } from '../type/Time';
import cron = require('node-cron');
import uuid = require('uuid/v4');

export class Account {
  protected _value: IAccount.Constructor;
  constructor(constructor: IAccount.Constructor) {
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
}

export default Account;
