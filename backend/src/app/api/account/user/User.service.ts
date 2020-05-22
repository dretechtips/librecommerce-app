import { Injectable, Inject } from "@nestjs/common";
import { Response } from "express";
import User from "./User.model";
import Service from "src/app/common/service/Service.factory";
import ExternalUserService from "./external_user/ExternalUser.service";
import InternalUserService from "./internal_user/InternalUser.service";
import { Types } from "mongoose";
import { UserDOT } from "./User.interface";
import InvalidDOTException from "src/app/common/exception/InvalidDOT.exception";
import { InjectModel } from "src/app/common/model/Model.decorator";
import LoginService from "./login/Login.service";
import DisableableService from "src/app/common/disableable/Disableable.service";
import { Delegate, SmartDelegate } from "src/app/common/mixin/Mixin.decorator";
import AccountService from "../Account.service";
import Account from "../Account.model";

@Injectable()
export class UserService extends Service<User> {

  constructor(
    @InjectModel(User) public readonly model: User,
    private readonly disableable: DisableableService,
    private readonly login: LoginService,
    private readonly internal: InternalUserService, 
    private readonly external: ExternalUserService
  ) {
    super();
    this.beforeSave(dot => this.hasDuplicateUsername(dot), true);
  }

  /**
   * Helper method to check if an account has a duplicate username within the database
   * @param username Account Username
   */
  private async hasDuplicateUsername(dot: UserDOT): Promise<boolean> {
    const usernames = await this.findAllByProp("username", dot.username);
    return usernames[1] ? true : false;
  }

  /**
   * Takes the credientals token
   * @param cToken Credientals Token
   * @param res: Express Response
   * @param getBanStatus: Checks if the user on hand is ban
   * @param getByCredientals Finds the account based off username and password
   */
  public async auth(
    cToken: string, 
    res: Response, 
    getBanStatus: (accountID: string) => Promise<boolean>,
  ): Promise<void> {
    const [username, password] = this.login.getInfo(cToken);
    const user = await this.getByCredentials(username, password);
    const loginToken = this.login.auth(user);
    if(getBanStatus(user._id))
      throw new Error("This account is banned from using our service!");
    if(this.disableable.isDisable(user))
      throw new Error("This account was closed and thus cannot be used.");
    this.login.setToken(res, loginToken);
  }

  /**
   * Gets the user if the username and password are valid
   * @param username User Username
   * @param password User Password
   */
  private async getByCredentials(username: string, password: string): Promise<User> {
    const account = (await this.findAllByProp("username", username))[0];
    if(account.password == password)
      return account;
    throw new Error("Invalid Credentials");
  }

  // /**
  //  * Helper method to extract account ID from login token
  //  * @param token Login Token | Request with a login token
  //  */
  // private async getLoginedAccount(token: string | Request): Promise<Account> {
  //   let accountID = typeof token === "string" 
  //     ? this.login.getAccountID(token) 
  //     : this.login.getAccountIDByReq(token);
  //   if(accountID === undefined)
  //     throw new Error("Account ID is invalid");
  //   return this.get(accountID);
  // }

}

export default UserService;