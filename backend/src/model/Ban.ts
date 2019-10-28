import { IPAddress, EmailAddress } from '../type/Location';
import uuid = require('uuid/v4');
import cron = require('node-cron');
import { User } from '../model/User';
import { Account, AccountManager } from '../model/Account';
import { ServerError } from '../type/Error';
import { Body } from '../interface/Ban.interface';
import { SearchQuery } from '../interface/Ban.interface';
import * as database from 'database';

export class Ban {
  private readonly _accountID: string;
  private readonly _timestamp: Date;
  private readonly _reason: string;
  public static search(query: Partial<SearchQuery>): Ban[] {
    // Database Method
  }
  constructor(accountID: string, reason: string) {
    this._accountID = accountID;
    this._timestamp = new Date();
    this._reason = reason;
  }
  public getAccount(): Account | never {
    const account: Account | null = AccountManager.from.id(this._accountID);
    if (!account)
      throw new ServerError('A ban cannot store an invalid account ID.');
    else return account;
  }
  public getIPs(): IPAddress[] {
    const account: Account | null = this.getAccount();
    if (account) return account.getIPs();
    else return [];
  }
  public getTimestamp(): Date {
    return this._timestamp;
  }
  public getAccountID(): string {
    return this._accountID;
  }
  public add(): void {
    // Database Method
  }
  public save() {
    // Database Method
  }
  public revoke() {
    // Database Method
  }
  public toPrimObj(): Body {
    return {
      customerID: this._accountID,
      reason: this._reason
    };
  }
}

export default Ban;
