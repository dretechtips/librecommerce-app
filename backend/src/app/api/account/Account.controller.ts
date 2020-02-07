import { Controller, Post, Param } from "@nestjs/common";
import { AccountType, AccountDOT } from "./Account.interface";
import AccountService from "./Account.service";

export const prefix = "account";

@Controller(prefix)
export class AccountController {
  constructor(private readonly account: AccountService) {}
  @Post("create/:type")
  public create(@Param("type") type, account: AccountDOT) {
    account.alertIDs = [];
    // Change this to browser fingerprint ID
    account.associatedIPs = [];

    this.account.create(type, {});
  }
}

export default AccountController;
