import { default as Database } from "./Database";
import { UserConstructor } from "../interface/User.interface";
import uuid = require('uuid/v4');

export class ActiveUsers
{
  private _session: Map<string, User>;
  private _expTime: 10800000;
  constructor(user: User[])
  {
    this._session = new Map();
    if(user !== null)
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
  public add(id: string, user: User): void
  {
    this._session.set(id, user);
    setTimeout(() => this.delete(id), this._expTime);
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
  }
  public ban(): void
  {

  }
  public getID(): string
  {
    return this._value.id;
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

