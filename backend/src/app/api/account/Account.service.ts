import { Injectable, Scope, OnModuleInit } from "@nestjs/common";
import { Request, Response } from "express";
import { AccountDOT, AccountType } from "./Account.interface";
import Account from "./Account.model";
import { prefix } from "./Account.controller";
import Service from "src/app/common/service/Service.factory";
import CustomerService from "./customer/Customer.service";
import UserService from "./user/User.service";
import { ModuleRef } from "@nestjs/core";
import LoginService from "../login/Login.service";

/**
 * @todo Get Account Type
 */
@Injectable()
export class AccountService extends Service<Account> {
  constructor() {
    super(Account);
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
  public async getAccountsFromFingerprint(fingerprintID: string) {
    return this.getByArrayValue("fingerprints", fingerprintID);
  }
}

export default AccountService;
