import { Injectable, OnModuleInit } from "@nestjs/common";
import { Document } from "mongoose";
import BanService from "./util/ban/Ban.service";
import Service from "src/app/common/service/Service.factory";
import Account from "./Account.model";
import LoginService from "./util/login/Login.service";
import { Request, Response } from "express";
import { AccountDOT } from "./Account.interface";
import DisableableService from "src/app/common/disableable/Disableable.service";
import { ModuleRef } from "@nestjs/core";
import SubscriptionService from "../sale/subscription/Subscription.service";
import { SubscriptionDependentService, SubscriptionDOT } from "../sale/subscription/Subscription.interface";
import { InjectModel } from "src/app/common/model/Model.decorator";
import CompanyService from "./company/Company.service";
import StoreService from "./store/Store.service";
import UserService from "./user/User.service";

/**
 * @todo Move login based stuff to user's module {this.getByCredentails & this.auth}
 */
@Injectable()
@InjectModel(Account)
export class AccountService extends Service<Account> implements OnModuleInit,
  SubscriptionDependentService<Account>  {
  
  private subscription: SubscriptionService;

  constructor (
    private readonly moduleRef: ModuleRef,
    private readonly disableable: DisableableService, 
    private readonly company: CompanyService,
    private readonly store: StoreService,
    private readonly user: UserService,
    private readonly ban: BanService, 
    private readonly login: LoginService
  ) {
    super();
  }

  public onModuleInit(): void {
    this.subscription = this.moduleRef.get(SubscriptionService, { strict: false });
  }

  /**
   * 
   * @param id Login Temp ID
   * @param index Subscription Index
   */
  public async unsubscribe(id: string, sID: string): Promise<Account> {
    return this.subscription.unsubscribe(await this.getLoginedAccount(id), sID);
  }
  /**
   * 
   * @param id Login ID
   * @param subscription Subscription DOT 
   */
  public async subscribe(id: string, subscription: SubscriptionDOT): Promise<Account> {
    return this.subscription.subscribe(await this.getLoginedAccount(id), subscription);
  }

  /**
   * Authenticates any user with or w/o a credientals. If the user doesn't have any ciredientals (aka a new user)
   * then this will automatically create a fingerprint based account
   * @param ip IP Address
   * @param credientals Login Credientals
   */
  public async auth(token: string, res: Response): Promise<void> {
    const [username, password] = this.login.getInfo(token);
    const account = await this.getByCredentials(username, password);
    const loginToken = this.login.auth(account);
    if(this.isBan(account._id))
      throw new Error("This account is banned from using our service!");
    if(this.disableable.isDisable(account))
      throw new Error("This account was closed and thus cannot be used.");
    this.login.setToken(res, loginToken);
  }

  /**
   * Check if the account is banned
   * @param accountID Account ID
   */
  public async isBan(accountID: string): Promise<boolean> {
    const bans = await this.ban.findAllByProp("accountID", accountID);
    if (bans[0]) {
      const ban = bans[0];
      return !ban.revoke;
    }
    return false;
  }
  /**
   * Marks an account as disable, so they can't login to the server anymore, however the account is still avaiable
   * @param accountID Account ID
   */
  public async disable(accountID: string): Promise<void> {
    const account = await this.get(accountID);
    this.disableable.disable(account);
  }
  /**
   * Gets the account if the username and password are valid
   * @param username Account Username
   * @param password Account Password
   */
  private async getByCredentials(username: string, password: string): Promise<Account> {
    const account = (await this.findAllByProp("username", username))[0];
    if(account.password == password)
      return account;
    throw new Error("Invalid Credentials");
  }

  /**
   * Helper method to extract account ID from login token
   * @param token Login Token | Request with a login token
   */
  private async getLoginedAccount(token: string | Request): Promise<Account> {
    let accountID = typeof token === "string" 
      ? this.login.getAccountID(token) 
      : this.login.getAccountIDByReq(token);
    if(accountID === undefined)
      throw new Error("Account ID is invalid");
    return this.get(accountID);
  }
}

export default AccountService;
