import { IPAddress, EmailAddress } from "../type/Location";
import uuid = require("uuid/v4");
import cron = require('node-cron');

export class BanList {
  private _list: Map<IPAddress, Ban>;
  constructor(bans?: Ban[]) {
    this._list = new Map();
    if (bans) {
      for (let i = 0; i < bans.length; i++) {
        this._list.set(bans[i].getIPAddress(), bans[i]);
      }
    }
    this.setEvents();
  }
  public add(ban: Ban) {
    this._list.set(ban.getIPAddress(), ban);
  }
  public remove(ipAddress: IPAddress): void {
    this._list.delete(ipAddress);
    return;
  }
  public save(): void {
    
    // write to db
  }
  public setEvents(): void {
    process.on("beforeExit", () => this.save());
    cron.schedule("0 2 * * *", () => this.save());
  }
  public find(ipAddress: IPAddress): Ban {
    return this._list.get(ipAddress);
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
  public add(appeal: BanAppeal) {
    this._list.set(appeal.getCaseID(), appeal);
  }
  public remove(caseID: string) {
    this._list.delete(caseID);
  }
  public save() {
    // Save to db
  }
  private setEvents() {
    process.on("beforeExit", () => this.save());
    cron.schedule("0 2 * * *", () => this.save());
  }
}

export class Ban {
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: EmailAddress;
  private readonly _timestamp: Date;
  private readonly _ipAddress: IPAddress;
  constructor(firstName: string, lastName: string, email: EmailAddress, ipAddress: IPAddress) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._ipAddress = ipAddress;
    this._timestamp = new Date();
  }
  public getFullName(): string {
    return this._firstName + " " + this._lastName;
  }
  public getIPAddress(): IPAddress {
    return this._ipAddress;
  }
  public getTimestamp(): Date {
    return this._timestamp;
  }
}

class BanAppeal {
  private readonly _message: string;
  private readonly _case: string;
  private readonly _ban: Ban;
  private readonly _timestamp: Date;
  private _resolution: "resolve" | "reject" | null;
  constructor(msg: string, ban: Ban) {
    this._message = msg;
    this._case = uuid();
    this._ban = ban;
    this._timestamp = new Date();
    this._resolution = null;
  }
  public getMessage(): string {
    return this._message;
  }
  public getCaseID(): string {
    return this._case;
  }
  public hasResolution(): boolean {
    if (!this._resolution) {
      return false;
    }
    else {
      return true;
    }
  }
}



