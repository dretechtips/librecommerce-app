import { Controller, Delete, Get, Param, Patch, Body } from "@nestjs/common";
import AccountService from "./Account.service";
import { RestrictAccess, LoginID } from "./util/login/Login.decorator";
import { AccountType } from "./Account.interface";
import { prefix as sPrefix } from "../sale/subscription/Subscription.controller";
import { SubscriptionDOT } from "../sale/subscription/Subscription.interface";

export const prefix = "account";

@Controller(prefix)
@RestrictAccess(AccountType.CUSTOMER, AccountType.EMPLOYEE)
export class AccountController {

  constructor(private readonly account: AccountService) {}

  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {
    return this.account.get(id).then(cur => cur.toJSON());
  }

  @Delete("disable/:id")
  public async disable(@Param("id") id: string) {
    await this.account.disable(id);
  }

  @Delete("subscriptions/unsubscribe/:id")
  public async unsubscribe(@LoginID() loginID: string, @Param("id") sID: string) {
    await this.account.unsubscribe(loginID, sID);
  }

  @Patch("subscriptions/add")
  public async subscribe(
    @Body(sPrefix, /** Validate Subscription Pipe */) subscription: SubscriptionDOT, 
    @LoginID() loginID: string
  ) {
    await this.account.subscribe(loginID, subscription);
  }

}

export default AccountController;
