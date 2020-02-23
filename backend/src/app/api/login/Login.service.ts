import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import crypto from "crypto";
import { Request } from "express";
import Service from "src/app/common/service/Service.factory";
import uuid from "uuid/v4";
import Account from "../account/Account.model";
import AccountService from "../account/Account.service";
import { AccountType } from "../account/type/Type.interface";
import { prefix } from "./Login.controller";
import { LoginDOT } from "./Login.interface";
import { Login } from "./Login.model";

@Injectable()
export class LoginService extends Service<typeof Login>
  implements OnModuleInit {
  private account: AccountService;
  private store: Map<string, string> = new Map();
  private encryption: crypto.CipherCCMTypes | crypto.CipherGCMTypes =
    "aes-256-gcm";
  /**
   * Preset 3 Hour
   */
  private timeoutMS: number = 1000 * 60 * 60 * 3;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Login);
  }
  public onModuleInit() {
    this.account = this.moduleRef.get(AccountService, { strict: false });
  }
  /**
   * @returns Client Token
   * @param ip IP Address
   * @param credientals Login Credientals
   */
  public async addToken(ip: string, credientals: LoginDOT): Promise<string> {
    const account = await this.account.get(credientals.accountID);
    if (!account) throw new Error("Invalid Login Credientals");
    const clientToken = uuid();
    const serverToken = this.hash(ip, clientToken);
    this.store.set(serverToken, account.id());
    this.setClearToken(serverToken);
    return clientToken;
  }
  public verifyToken(ip: string, loginID: string): boolean {
    return this.getAccountID(ip, loginID) ? true : false;
  }
  public getAccountID(ip: string, loginID: string): string | undefined {
    const serverToken = this.hash(ip, loginID);
    const accountID = this.store.get(serverToken);
    return accountID;
  }
  public async getAccount(ip: string, loginID: string): Promise<Account> {
    const accountID = this.getAccountID(ip, loginID);
    if (!accountID) throw new Error("Invalid Login ID");
    return this.account.get(accountID);
  }
  private hash(ip: string, clientToken: string): string {
    const secret: string = crypto
      .createCipheriv(this.encryption, ip, null)
      .update(clientToken, "utf8", "hex");
    return secret;
  }
  public async getOwnAccount(req: Request): Promise<Account> {
    const ip = req.ip;
    const loginID = req.cookies[prefix];
    if (typeof loginID === "string") return this.getAccount(ip, loginID);
    throw new TypeError("Login ID is not a string");
  }
  public async getOwnAccountType(req: Request): Promise<AccountType> {
    return this.account.getAccountType((await this.getOwnAccount(req))._id);
  }
  public async isOwnAccountBanned(req: Request): Promise<boolean> {
    const account = await this.getOwnAccount(req);
    return this.account.isBan(account._id);
  }
  private setClearToken(secret: string): void {
    setTimeout(() => this.store.delete(secret), this.timeoutMS);
  }
}

export default LoginService;
