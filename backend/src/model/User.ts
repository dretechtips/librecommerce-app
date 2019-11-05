import { default as Database } from './Database';
import { IUser } from '../interface/User.interface';
import uuid = require('uuid/v4');
import { UserSM } from '../service/User.service';
import { EmailAddress, Address, PhoneNum, IPAddress } from '../type/Location';
import * as BanController from '../controller/Ban.controller';
import { Time } from '../type/Time';
import { Ban } from '../model/Ban';
import Account from './Account';
import AccountActive from './AccountActive';
import { Password } from '../type/Password';
import { Schedule } from './Schedule';
import Payment from '../type/Payment';

export class User extends Account {
  protected _value: IUser.Value;
  constructor(user: IUser.Constructor) {
    const value: IUser.Value = {
      ...user,
      rank: 'RANK_2'
    };
    super(value);
  }
  public getPayment(): Payment {
    return this._value.payment;
  }
  public save(): void {}
  public delete(): void {}
  public update(): void {}
  public static generate(body: IUser.NewBody): User {
    const user: IUser.Constructor = {
      id: uuid(),
      firstName: body.firstName,
      lastName: body.lastName,
      privilege: body.privilege,
      username: body.username,
      password: new Password(body.password),
      address: new Address(body.address),
      emailAddress: new EmailAddress(body.emailAddress),
      phoneNum: new PhoneNum(body.phoneNum),
      schedule: Schedule.generate(body.schedule),
      position: body.position,
      alerts: [],
      associatedIPs: [],
      payment: body.payment
    };
    return new User(user);
  }
  public static search(): User[] {}
}

export default User;
