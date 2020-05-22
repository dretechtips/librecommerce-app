import { Injectable, OnModuleInit } from "@nestjs/common";
import { Document } from "mongoose";
import BanService from "./util/ban/Ban.service";
import Service from "src/app/common/service/Service.factory";
import Account from "./Account.model";
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
export class AccountService extends Service<Account> implements OnModuleInit,
  SubscriptionDependentService<Account>  {
  
  private subscription: SubscriptionService;

  constructor (
    @InjectModel(Account) public readonly model: Account,
    private readonly moduleRef: ModuleRef,
    private readonly disableable: DisableableService, 
    private readonly company: CompanyService,
    private readonly store: StoreService,
    private readonly user: UserService,
    private readonly ban: BanService,
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
    return this.subscription.unsubscribe(await this.get(id), sID);
  }
  /**
   * 
   * @param id Login ID
   * @param subscription Subscription DOT 
   */
  public async subscribe(id: string, subscription: SubscriptionDOT): Promise<Account> {
    return this.subscription.subscribe(await this.get(id), subscription);
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
   * Authenticates any user with or w/o a credientals. If the user doesn't have any ciredientals (aka a new user)
   * then this will automatically create a fingerprint based account
   * @param cToken Credientals Token
   * @param credientals Login Credientals
   */
  public async auth(token: string, res: Response): Promise<void> {
    return this.user.auth(token, res, this.isBan);
  }

  /**
   * Finds the closest internal store to the account
   * @param account Account
   */
  public async getClosestStore(account: Account | string): Promise<> {
    if(account instanceof string) {
      
    }
  }

}

export default AccountService;
