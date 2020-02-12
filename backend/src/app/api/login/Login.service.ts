import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import crypto from "crypto";
import uuid from "uuid/v4";
import AccountService from "../account/Account.service";
import { LoginDOT } from "./Login.interface";
import { AccountType } from "../account/Account.interface";
import { prefix } from "./Login.controller";
import Account from "../account/Account.model";
import Service from "src/app/common/service/Service.factory";
import { Login } from "./Login.model";

@Injectable()
export class LoginService extends Service<Login> {
  private store: Map<string, string> = new Map();
  private encryption: crypto.CipherCCMTypes | crypto.CipherGCMTypes =
    "aes-256-gcm";
  /**
   * Preset 1 Hour
   */
  private timeoutMS: number = 3600000;
  constructor(private readonly account: AccountService) {
    super(Login);
  }
  /**
   * @returns Client Token
   * @param ip IP Address
   * @param credientals Login Credientals
   */
  public async addToken(ip: string, credientals: LoginDOT): Promise<string> {
    const account = await this.account.getAccountWithCredientals(
      credientals.username,
      credientals.password
    );
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
  public async getAccount(
    ip: string,
    loginID: string
  ): Promise<Account | null> {
    const accountID = this.getAccountID(ip, loginID);
    if (!accountID) return null;
    return Account.getSelfByID(accountID) as Promise<Account | null>;
  }
  private hash(ip: string, clientToken: string): string {
    const secret: string = crypto
      .createCipheriv(this.encryption, ip, null)
      .update(clientToken, "utf8", "hex");
    return secret;
  }
  public async getOwnAccount(req: Request): Promise<Account | null> {
    const ip = req.ip;
    const loginID = req.cookies[prefix];
    if (typeof loginID === "string") return this.getAccount(ip, loginID);
    return null;
  }
  private setClearToken(secret: string): void {
    setTimeout(() => this.store.delete(secret), this.timeoutMS);
  }
}

export default LoginService;
