import { Injectable, } from "@nestjs/common";
import uuid from "uuid/v4";
import Account from "../../Account.model";
import { Login } from "./Login.model";
import Service from "src/app/common/service/Service.factory";
import { prefix } from "./Login.controller";
import { Request, Response } from "express";
import { InjectModel } from "src/app/common/model/Model.decorator";
import User from "../User.model";

@Injectable()
@InjectModel(Login)
export class LoginService extends Service<Login> {
  /**
   * <LoginID, AccountID>
   */
  private store: Map<string, string> = new Map();
  /**
   * Preset 3 Hour
   */
  private timeoutMS: number = 1000 * 60 * 60 * 3;

  constructor() {
    super();
    this.store = new Map();
  }

  /**
   * 
   * @param token User Account Credientals Token { Base64(username + ":" + password) | Fingerprint ID }
   * @returns [Username, Password]
   */
  public getInfo(token: string): [string, string] {
    const decoded = Buffer.from(token, 'base64').toString();
    const [ username, password ] = decoded.split(":");
    return [username, password];
  }

  /**
   * This saves the account and give out a login token
   * @returns Login Token
   * @param account Account
   */
  public auth(account: User): string {
    const token = uuid();
    this.store.set(token, account._id);
    this.setClearToken(token);
    return token;
  }
  
  /**
   * Set a token in the cookie for future use
   * @param res Express Response
   * @param token Login Token
   */
  public setToken(res: Response, token: string): void {
    res.cookie(prefix, token);
  }

  public getUserIDByReq(req: Request): string | undefined {
    const loginID = req.cookies[prefix];
    return this.getUserID(loginID);
  }

  public getUserID(loginID: string): string | undefined {
    return this.store.get(loginID);
  }
  /**
   * Util Function: Clears the token
   * @param secret Login Token
   */
  private setClearToken(secret: string): void {
    setTimeout(() => this.store.delete(secret), this.timeoutMS);
  }
}

export default LoginService;
