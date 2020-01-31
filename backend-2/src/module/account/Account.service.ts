import { Injectable, Scope } from "@nestjs/common";
import { AccountDOT, AccountType } from "./Account.interface";
import TagService from "src/common/services/Tag.service";
import Account from "./Account.model";

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
  public async getAccount(
    username: string,
    password: string
  ): Promise<Account | null> {
    return Account.getSelfBy({
      username,
      password
    }) as Promise<Account | null>;
  }
}

export default AccountService;
