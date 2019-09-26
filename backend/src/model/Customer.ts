import { default as Database, DatabaseQuery } from './Database';
import {  CustomerConstructor, NewCustomerBody  } from '../interface/Customer.interface';
import { QueryResult, FieldDef } from 'pg';
import uuid = require('uuid/v4');
import { Address, EmailAddress, PhoneNum, IPAddress } from "../type/Location";
import { BanController } from '../controller/Ban.controller';
import { Ban } from "../model/Ban";
import { Time } from "../type/Time";

type customerID = string;
type accessToken = string;

export class ActiveCustomer {
  protected _session: Map<accessToken, customerID>;
  protected _timeout: Time;
  constructor(customers?: Customer[]) {
    this._session = new Map();
    this._timeout = new Time(3, "h");
    this._timeout.toMilliSeconds();
    if (!isNotSet(customers)) {
      for (let i = 0; i < customers.length; i++) {
        const cur: Customer = customers[i];
        this._session.set(uuid(), cur.getValue().id);
      }
    }
  }
  public add(customer: Customer): accessToken {
    const accessToken: string = uuid();
    this._session.set(accessToken, customer.getID());
    setTimeout(() => this.remove(accessToken), this._timeout.getAmount());
    return accessToken;
  }
  public remove(accessToken: accessToken): boolean {
    return this._session.delete(accessToken);
  }
  public fetch(accessToken: accessToken): customerID {
    return this._session.get(accessToken);
  }
}

export class PasswordResetList extends ActiveCustomer {
  constructor(customers?: Customer[]) {
    super(customers);
    this._timeout = new Time(24, "h");
  }
}

export class CustomerManager {
  public static add(data: CustomerConstructor): Customer {
    // save into database
    return new Customer(data);
  }
  public static delete(id: string) {

  }
  public static from = class {
    public static id(id: string): Customer {

    }
    public static username(username: string): Customer {

    }
    public static credientals(username: string, password: string): Customer {

    }
    public static IPAddress(ipAddress: IPAddress): Customer[] {

    }
  }
}


export class Customer
{
  private _value: CustomerConstructor;
  private _details: DatabaseQuery;
  constructor(customer: CustomerConstructor)
  {
    this._value = customer;
    //const query: DatabaseQuery = this._details.insert();
  }
  public getValue(): CustomerConstructor
  {
    return this._value;
  }
  public getID(): string {
    return this._value.id;
  }
  public ban(reason: string): Ban {
    this._value.isBan = true;
    const ban: Ban = new Ban(this, reason);
    BanController.Account.add(ban);
    return ban;
  }
  public save(): void {

  }
  public update(body: any): void
  {
    if (body.firstName) this._value.firstName = body.firstName;
    if (body.lastName) this._value.lastName = body.lastName;
    if (body.username) this._value.username = body.username;
    if (body.address) this._value.address = new Address(body.address);
    if (body.email) this._value.email = new EmailAddress(body.email);
    if (body.phone) this._value.phone = new PhoneNum(body.phoneNum);
  }
  public static generate(body: NewCustomerBody): Customer {
    const customer: CustomerConstructor = {
      firstName: body.firstName,
      lastName: body.lastName,
      id: uuid(),
      ordersID: [],
      username: body.username,
      password: body.password,
      lastOrderDate: null,
      address: new Address(body.address),
      email: new EmailAddress(body.email),
      phone: new PhoneNum(body.phone)
    }
    return new Customer(customer);
  }
}
