import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Request } from "express";
import Service from "src/app/common/service/Service.factory";
import { AccountType } from "../../account/Account.interface";
import LoginService from "../../login/Login.service";
import { SubscriptionDOT, SubscriptionLink } from "./Subscription.interface";
import Subscription from "./Subscription.model";

@Injectable()
export class SubscriptionService extends Service<typeof Subscription>
  implements OnModuleInit {
  private login: LoginService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Subscription);
  }
  public onModuleInit() {
    this.login = this.moduleRef.get(LoginService);
  }
  public async create(req: Request, subscription: SubscriptionDOT) {
    const accountType = await this.login.getOwnAccountType(req);
    if (accountType !== AccountType.ADMIN) subscription.discount = 0;
    return this.add(subscription);
  }
  public deactivate(id: string) {}
  public async chargeAllActive() {
    const payments = this.findAllByProp("active", true);
  }
  public async findAllByLink(subscription: SubscriptionLink) {
    return this.getAll(subscription.subscriptionIDs);
  }
}

export default SubscriptionService;
