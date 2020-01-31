import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import crypto from "crypto";
import uuid from "uuid/v4";
import AccountService from "../account/Account.service";
import { LoginDOT } from "./Login.interface";
import { AccountType } from "../account/Account.interface";
import { prefix } from "./Login.controller";

@Injectable()
export class LoginService {
  private store: Map<string, string> = new Map();
  private encryption: crypto.CipherCCMTypes | crypto.CipherGCMTypes =
    "aes-256-gcm";
  /**
   * Preset 1 Hour
   */
  private timeoutMS: number = 3600000;
  constructor(private readonly account: AccountService) {}
  /**
   * @returns Client Token
   * @param ip IP Address
   * @param credientals Login Credientals
   */
  public async addToken(ip: string, credientals: LoginDOT): Promise<string> {
    const account = await this.account.getAccount(
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
    const serverToken = this.hash(ip, loginID);
    const accountID = this.store.get(serverToken);
    return accountID ? true : false;
  }
  private hash(ip: string, clientToken: string): string {
    const secret: string = crypto
      .createCipheriv(this.encryption, ip, null)
      .update(clientToken, "utf8", "hex");
    return secret;
  }
  private setClearToken(secret: string): void {
    setTimeout(() => this.store.delete(secret), this.timeoutMS);
  }
}

export default LoginService;
