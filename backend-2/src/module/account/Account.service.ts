import { Injectable, Scope } from "@nestjs/common";
import { AccountDOT, AccountType } from "./Account.interface";
import TagService from "src/common/services/Tag.service";

/**
 * @todo Get Account Type
 */
@Injectable()
export class AccountService {
  constructor(public readonly tag: TagService<AccountDOT>) {}
  public getAccountType(
    username: string,
    password: string
  ): AccountType | null {
    return "admin";
  }
}

export default AccountService;
