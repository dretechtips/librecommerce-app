import { default as Database } from "./Database";
import { UserConstructor, UserBody } from "../interface/User.interface";
import uuid = require('uuid/v4');
import { UserManager } from "../service/User.service";
import { EmailAddress, Address, PhoneNum } from "../type/Location";
import { BanController } from "../controller/Ban.controller";

export class ActiveUsers
{
  private _session: Map<string, User>;
  private _expTime: 10800000;
  private manager: UserManager;
  constructor(user?: User[])
  {
    this._session = new Map();
    if(user !== undefined)
    {
      for(let i = 0 ; i < user.length ; i++)
      {
        const cur: User = user[i];
        this._session.set(cur.getID(), cur);
      }
    }
  }
  public getList(): User[]
  {
    return Array.from(this._session.values());
  }
  public add(accessToken: string, user: User): void
  {
    this._session.set(user.getID(), user);
    setTimeout(() => this.delete(user.getID()), this._expTime);
  }
  public delete(userID: string): void
  {
    this._session.delete(userID);
  }
  public fetch(token: string): User
  {
    return this._session.get(token);
  }
  public hasToken(token: string): boolean
  {
    const user: User = this._session.get(token);
    if(user === undefined) return false
    else return true;
  }
  public getExpTime(): number
  {
    return this._expTime;
  }
}

export class User
{
  private _value: UserConstructor;
  constructor(user: UserConstructor)
  {
    this._value = user;
    if (!isNotSet(this._value.alerts))
      this._value.alerts = [];
  }
  public ban(reason: string): void
  {
    
  }
  public getID(): string
  {
    return this._value.id;
  }
  public static generate(body: UserBody): User {
    const [firstName, lastName] = Buffer.from(body.nameInfo, "base64").toString().split(":");
    const [username, password] = Buffer.from(body.loginInfo, "base64").toString().split(":");
    const user: UserConstructor = {
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
      privilege: body.privilege,
      username: username,
      password: password,
      address: new Address(body.address),
      emailAddress: new EmailAddress(body.emailAddress),
      phoneNum: new PhoneNum(body.phoneNum),
      schedule: null,
      position: body.position,
      alerts: null,
    }
    return new User(user);
  }
  public static From = class {
    public static cred(user: string, pass: string): User
    {
      return null;
    }
    public static id(id: string)
    {
      
    }
  }
}

