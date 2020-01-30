import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import uuid from "uuid/v4";
import AccountService from "../account/Account.service";
import { LoginDOT } from "./Login.interface";
import { AccountType } from "../account/Account.interface";
import crypto from "crypto";

@Injectable()
export class LoginService {
  private store: Map<string, AccountType> = new Map();
  constructor(private readonly account: AccountService) {}
  public addToken(req: Request, res: Response, credientals: LoginDOT) {
    const accountType = this.account.getAccountType(
      credientals.username,
      credientals.password
    );
    if (!accountType) throw new Error("Invalid Login Credientals");
    const clientToken = uuid();
    const secret = req.ip;
    const serverToken = crypto.createCipheriv("aes-256-gcm").update();
  }
  public verifyToken() {}
}

export default LoginService;
