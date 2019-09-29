import { IPAddress, Address } from "../type/Location";
import { IAccount } from "../interface/Account.interface";
import { Ban } from "../model/Ban";
import { BanController } from "../controller/Ban.controller";
import { Time } from "../type/Time";
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
    return this._value.firstName + " " + this._value.lastName;
  }
  public getID(): string {
    return this._value.id;
  }
  public getAddress(): Address {
    return this._value.address;
  }
  public ban(reason: string): Ban {
    const ban: Ban = new Ban(this, reason);
    BanController.Account.add(ban);
    return ban;
  }
}
// @Param session = <access_token, accountID>
export class ActiveAccount {
  private _session: Map<string, string>;
  protected _timeout: Time;
  constructor(accounts?: Account[]) {
    this._session = new Map();
    if (accounts) {
      for (let account of accounts) {
        this._session.set(uuid(), account.getID());
      }
    }
    this._timeout = new Time(3, "h");
    this._timeout.toMilliSeconds();
  }
  public add(account: Account): string {
    const id: string = uuid();
    this._session.set(id, account.getID());
    return id;
  }
  public delete(accessToken: string): boolean {
    return this._session.delete(accessToken);
  }
  public fetch(accessToken: string): string | null {
    const accountID: string | undefined = this._session.get(accessToken);
    return accountID ? accountID : null;
  }
}

// @Param list = <accountID, account>
export class AccountManager {
  public static from = class {
    public static credientals(username: string, password: string): Account | null{

    }
    public static id(id: string): Account | null {

    }
    public static ipAddress(ip: IPAddress): Account[] | null {

    }
    public static username(username: string): Account[] | null {

    }
  }
}

export class PasswordResetList extends ActiveAccount {
  constructor(accounts?: Account[]) {
    super(accounts);
    this._timeout = new Time(24, "h");
  }
}