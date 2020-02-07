import { Injectable, Scope } from "@nestjs/common";
import { Request } from "express";
import { AccountDOT, AccountType } from "./Account.interface";
import TagService from "src/app/common/tag/Tag.service";
import Account from "./Account.model";
import LoginService from "../login/Login.service";
import { prefix as loginPrefix } from "../login/Login.controller";
import ServiceFactory from "src/app/common/service/Service.factory";

/**
 * @todo Get Account Type
 */
@Injectable()
export class AccountService extends ServiceFactory(Account) {
  constructor(
    public readonly tag: TagService<AccountDOT>,
    private readonly login: LoginService
  ) {
    super();
  }
  public getAccountTypeWithCredientals(
    username: string,
    password: string
  ): AccountType | null {
    return "admin";
  }
  public async getAccountWithCredientals(
    username: string,
    password: string
  ): Promise<Account | null> {
    return Account.getSelfBy({
      username,
      password
    }) as Promise<Account | null>;
  }
  public async getAccounts(accountIds: string[]): Promise<Account[] | null> {
    return Account.getSelvesByIDs(accountIds) as Promise<Account[] | null>;
  }
  public async create(type: string, accountDOT: AccountDOT) {
    // @todo
  }
}

export default AccountService;
