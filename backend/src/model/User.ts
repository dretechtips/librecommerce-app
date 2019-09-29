import { default as Database } from "./Database";
import { UserConstructor, UserBody } from "../interface/User.interface";
import uuid = require('uuid/v4');
import { UserSM } from "../service/User.service";
import { EmailAddress, Address, PhoneNum, IPAddress } from "../type/Location";
import { BanController } from "../controller/Ban.controller";
import { Time } from "../type/Time";
import { Ban } from "../model/Ban";
import { ActiveAccount, AccountManager, Account } from "./Account";
import { Password } from "../type/Password";
import { Schedule } from "./Schedule";

export class ActiveUsers extends ActiveAccount { }

export class UserManager extends AccountManager { }

export class User extends Account
{
  protected _value: UserConstructor;
  constructor(user: UserConstructor)
  {
    super(user);
  }
  public save(): void {

  }
  public delete(): void {

  }
  public update(): void {

  }
  public static generate(body: UserBody): User {
    const user: UserConstructor = {
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
      rank: "RANK_2",
      associatedIPs: [],
    }
    return new User(user);
  }
}

