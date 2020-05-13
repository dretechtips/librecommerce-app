import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Request } from "express";
import Service from "src/app/common/service/Service.factory";
import { AccountType } from "../../account/Account.interface";
import LoginService from "../../account/util/login/Login.service";
import { SubscriptionDOT, SubscriptionDependentDOT } from "./Subscription.interface";
import Subscription from "./Subscription.model";
import { Document } from "mongoose";

@Injectable()
export class SubscriptionService extends Service<typeof Subscription> {

  constructor(private readonly moduleRef: ModuleRef) {
    super(Subscription);
  }
  
  public async create(req: Request, subscription: SubscriptionDOT) {
    const accountType = await this.login.getOwnAccountType(req);
    if (accountType !== AccountType.ADMIN) subscription.discount = 0;
    return this.add(subscription);
  }
  /**
   * Deactives a subscription
   * @param id Subscription ID
   */
  public deactivate(id: string) {}

  /**
   * Charges all active subscription
   */
  public async chargeAllActive(): Prommise<void> {
    const payments = this.findAllByProp("active", true);
  }

  public async unsubscribe<U extends SubscriptionDependentDOT & Document>(doc: U, sID: string): U {
    // TODO
  }

  public async subscribe<U extends SubscriptionDependentDOT & Document>(doc: U, subscription: SubscriptionDOT): U {
    // TODO
  }
}

export default SubscriptionService;
