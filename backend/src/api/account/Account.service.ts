import { Injectable, Scope } from "@nestjs/common";
import { Request } from "express";
import { AccountDOT, AccountType } from "./Account.interface";
import TagService from "src/common/services/Tag.service";
import Account from "./Account.model";
import LoginService from "../login/Login.service";
import { prefix as loginPrefix } from "../login/Login.controller";

/**
 * @todo Get Account Type
 */
@Injectable()
export class AccountService {
  constructor(
    public readonly tag: TagService<AccountDOT>,
    private readonly login: LoginService
  ) {}
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
}

export default AccountService;
