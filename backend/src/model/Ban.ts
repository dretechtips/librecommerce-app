import { IPAddress, EmailAddress } from "../type/Location";
import uuid = require("uuid/v4");
import cron = require('node-cron');
import { User } from "../model/User";
import { Account, AccountManager } from "../model/Account";
import { ServerError } from "./Error";


// @param list <accountID, Ban>
export class BanList {
  private _list: Map<string, Ban>;
  constructor(bans?: Ban[]) {
    this._list = new Map();
    if (bans) {
      for (let i = 0; i < bans.length; i++) {
        try {
          const account: Account | null = bans[i].getAccount();
          if (!account)
            throw new ServerError("System tried to initilize a ban list with an invalid account.")
          this._list.set(account.getID(), bans[i]);
        }
        catch (e) {
          const ex: Error = e;
          hconsole.error(ex);
        }
      }
    }
    this.setEvents();
  }
  public add(ban: Ban): void {
    const account: Account | null = ban.getAccount();
    if(!account)
      this._list.set(ban.getAccount().getID(), ban);
  }
  public remove(accountID: string): void {
    this._list.delete(accountID);
    return;
  }
  public save(): void {
    // database method
  }
  private setEvents(): void {
    process.on("beforeExit", () => this.save());
    cron.schedule("0 2 * * *", () => this.save());
  }
  public find(accountID: string): Ban | null {
    const ban: Ban | undefined = this._list.get(accountID);
    if (ban)
      return ban;
    else
      return null;
  }
  public findFromIP(ipAddress: IPAddress): Ban[] | null {
    const accounts: Account[] | null = AccountManager.from.ipAddress(ipAddress);
    if (accounts) {
      const banList: null[] | Ban[] = new Array(accounts.length).fill(null);
      for (let i = 0; i < accounts.length; i++) {
        const cur: Account = accounts[i];
        const ban: Ban | undefined = this._list.get(cur.getID());
        if(ban)
          banList[i] = ban;
      }
      return banList as Ban[];
    }
    else {
      return null;
    }
  }
}

export class BanAppealList {
  private _list: Map<string, BanAppeal>
  constructor(appeals?: BanAppeal[]) {
    this._list = new Map();
    if (appeals) {
      for (let i = 0; i < appeals.length; i++) {
        this._list.set(appeals[i].getCaseID(), appeals[i]);
      }
    }
  }
  public add(appeal: BanAppeal): void {
    this._list.set(appeal.getCaseID(), appeal);
  }
  public remove(caseID: string): void {
    this._list.delete(caseID);
  }
  public find(caseID: string): BanAppeal | null {
    const appeal: BanAppeal | undefined = this._list.get(caseID);
    if (appeal)
      return appeal;
    else
      return null;
  }
  public save(): void {
    // Save to db
  }
  private setEvents(): void {
    process.on("beforeExit", () => this.save());
    cron.schedule("0 2 * * *", () => this.save());
  }
}

export class Ban {
  private readonly _accountID: string;
  private readonly _timestamp: Date;
  private readonly _reason: string;
  constructor(accountID: string, reason: string) {
    this._accountID = accountID;
    this._timestamp = new Date();
    this._reason = reason;
  }
  public getAccount(): Account | never {
    const account: Account | null = AccountManager.from.id(this._accountID);
    if (!account)
      throw new ServerError("A ban cannot store an invalid account ID.");
    else
      return account;
  }
  public getIPs(): IPAddress[] {
    const account: Account | null = this.getAccount();
    if (account)
      return account.getIPs();
    else
      return [];
  }
  public getTimestamp(): Date {
    return this._timestamp;
  }
  public getAccountID(): string {
    return this._accountID;
  }
}

export class BanAppeal {
  private readonly _message: string;
  private readonly _case: string;
  private readonly _ban: Ban;
  private readonly _timestamp: Date;
  private _resolution: "resolve" | "reject" | "incomplete";
  constructor(msg: string, ban: Ban) {
    this._message = msg;
    this._case = uuid();
    this._ban = ban;
    this._timestamp = new Date();
    this._resolution = "incomplete";
  }
  public getMessage(): string {
    return this._message;
  }
  public getCaseID(): string {
    return this._case;
  }
  public getBan(): Ban {
    return this._ban;
  }
  public hasResolution(): boolean {
    if (!this._resolution) {
      return false;
    }
    else {
      return true;
    }
  }
  public getResolution(): "resolve" | "reject" | "incomplete" {
    return this._resolution;
  }
  public setResolution(res: "resolve" | "reject") {
    this._resolution = res;
  }
}



