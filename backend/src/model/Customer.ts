import { default as Database, DatabaseQuery } from './Database';
import {  ICustomer  } from '../interface/Customer.interface';
import { QueryResult, FieldDef } from 'pg';
import uuid = require('uuid/v4');
import { Address, EmailAddress, PhoneNum, IPAddress } from "../type/Location";
import { ActiveAccount, Account, AccountManager } from "../model/Account";
import { Password } from '../type/Password';

export class ActiveCustomer extends ActiveAccount { }

export class CustomerManager extends AccountManager {  }

export class Customer extends Account
{
  protected _value: ICustomer.Value;
  constructor(customer: ICustomer.Constructor)
  {
    const value: ICustomer.Value = {
      ...customer,
      subscriptionsID: [],
    }
    super(value);
  }
  public save(): void {
    // Database Method
  }
  public delete(): void {
    // Database Method
  }
  public getSubscriptionPackagesID(): string[] {
    return this._value.subscriptionsID;
  }
  public removeSubPackages(pID: string): void {
    this._value.subscriptionsID = this._value.subscriptionsID.filter(cur => cur === pID);
  }
  public update(body: any): void
  {
    if (body.firstName) this._value.firstName = body.firstName;
    if (body.lastName) this._value.lastName = body.lastName;
    if (body.username) this._value.username = body.username;
    if (body.address) this._value.address = new Address(body.address);
    if (body.email) this._value.emailAddress = new EmailAddress(body.email);
    if (body.phone) this._value.phoneNum = new PhoneNum(body.phoneNum);
  }
  public static generate(body: ICustomer.NewBody): Customer {
    const customer: ICustomer.Constructor = {
      firstName: body.firstName,
      lastName: body.lastName,
      id: uuid(),
      ordersID: [],
      username: body.username,
      password: new Password(body.password),
      lastOrderDate: undefined,
      address: new Address(body.address),
      emailAddress: new EmailAddress(body.emailAddress),
      phoneNum: new PhoneNum(body.phoneNum),
      alerts: [],
      associatedIPs: [],
    }
    return new Customer(customer);
  }
}
