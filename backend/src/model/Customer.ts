import {
  Value,
  Constructor,
  SearchQuery,
  NewBody
} from '../interface/Customer.interface';
import uuid = require('uuid/v4');
import { Address, EmailAddress, PhoneNum, IPAddress } from '../type/Location';
import Account from '../model/Account';
import AccountActive from '../model/AccountActive';
import { Password } from '../type/Password';

export class Customer extends Account {
  protected _value: Value;
  constructor(customer: Constructor) {
    const value: Value = {
      ...customer,
      subscriptionsID: []
    };
    super(value);
  }
  public save(): void {
    // Database Method
  }
  public remove(): void {
    // Database Method
  }
  public add(): void {}
  public getSubscriptionPackagesID(): string[] {
    return this._value.subscriptionsID;
  }
  public removeSubPackages(pID: string): void {
    this._value.subscriptionsID = this._value.subscriptionsID.filter(
      cur => cur === pID
    );
  }
  public update(body: Partial<NewBody>): void {}
  public static generate(body: NewBody): Customer {
    const customer: Constructor = {
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
      associatedIPs: []
    };
    return new Customer(customer);
  }
  public static search(query: Partial<SearchQuery>): Customer[] {}
}

export default Customer;
