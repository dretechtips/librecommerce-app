import { IPAddress, EmailAddress } from "../type/Location";
import uuid = require("uuid/v4");
import cron = require('node-cron');
import { Customer } from "../model/Customer";

export class BanList {
  private _list: Map<Customer, Ban>;
  constructor(bans?: Ban[]) {
    this._list = new Map();
    if (bans) {
      for (let i = 0; i < bans.length; i++) {
        this._list.set(bans[i].getCustomer(), bans[i]);
      }
    }
    this.setEvents();
  }
  public add(ban: Ban): void {
    this._list.set(ban.getCustomer(), ban);
  }
  public remove(customer: Customer): void {
    this._list.delete(customer);
    return;
  }
  public save(): void {
    
    // write to db
  }
  private setEvents(): void {
    process.on("beforeExit", () => this.save());
    cron.schedule("0 2 * * *", () => this.save());
  }
  public find(customer: Customer): Ban {
    const ban: Ban = this._list.get(customer);
    return ban ? ban : null;
  }
  public findFromIP(ipAddress: IPAddress): Ban[] {
    const customer: Customer[] = Customer.From.IPAddress(ipAddress);
    const banList: Ban[] = new Array<Ban>(customer.length).fill(null);
    for (let i = 0; i < customer.length; i++) {
      const cur: Customer = customer[i];
      banList[i] = this._list.get(cur);
    }
    return banList;
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
  public find(caseID: string): BanAppeal {
    return this._list.get(caseID);
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
  private readonly _customer: Customer;
  private readonly _timestamp: Date;
  private readonly _reason: string;
  constructor(customer: Customer, reason: string) {
    this._customer = customer;
    this._timestamp = new Date();
    this._reason = reason;
  }
  public getAllIPAddress(): IPAddress[] {
    return this._customer.getValue().associatedIP;
  }
  public getTimestamp(): Date {
    return this._timestamp;
  }
  public getCustomer(): Customer {
    return this._customer;
  }
}

export class BanAppeal {
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
  public getResolution(): "resolve" | "reject" {
    return this._resolution;
  }
  public setResolution(res: "resolve" | "reject") {
    this._resolution = res;
  }
}



