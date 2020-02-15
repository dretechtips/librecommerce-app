import { Injectable, Scope, OnModuleInit } from "@nestjs/common";
import { Request, Response } from "express";
import {
  AccountDOT,
  AccountType,
  AccountTypeService
} from "./Account.interface";
import Account from "./Account.model";
import { prefix } from "./Account.controller";
import Service from "src/app/common/service/Service.factory";
import CustomerService from "./customer/Customer.service";
import UserService from "./user/User.service";
import { ModuleRef } from "@nestjs/core";
import LoginService from "../login/Login.service";
import { Typegoose } from "typegoose";

/**
 * @todo Get Account Type
 */

@Injectable()
export class AccountService extends Service<typeof Account> {
  private types: Map<AccountType, AccountTypeService>;
  constructor(
    private readonly customer: CustomerService,
    private readonly user: UserService
  ) {
    super(Account);
    this.setTypes();
  }
  private setTypes() {
    this.types.set(AccountType.CUSTOMER, this.customer);
    this.types.set(AccountType.ADMIN, this.user);
  }
  public async findByCredientals(
    username: string,
    password: string
  ): Promise<Account> {}
  public async getAccountsFromFingerprint(fingerprintID: string) {
    return this.findAllByArrayValue("fingerprints", fingerprintID);
  }
  public async getAccountType(accountID: string): Promise<AccountType> {
    await this.get(accountID);
    return new Promise(async (res, rej) => {
      await Promise.all(
        Array.from(this.types.entries()).map(cur => [
          cur[0],
          cur[1]
            .isAccountType(accountID)
            .then(bool => res(cur[0]))
            .catch()
        ])
      );
      rej("No account type was linked to the account ID");
    });
  }
}

export default AccountService;
