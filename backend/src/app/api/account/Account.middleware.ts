import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { prefix } from "./Account.controller";
import { AccountDOT } from "./Account.interface";
import Account from "./Account.model";
import AccountService from "./Account.service";

/**
 * Adds account into the database and updates the path to include the :accountID for use
 */
@Injectable()
export class CreateAccountMiddleware implements NestMiddleware {
  constructor(private readonly account: AccountService) {}
  public async use(req: Request, res: Response, next: Function) {
    const accountDOT: AccountDOT = {
      ...req.body[prefix],
      fingerprintIDs: [],
      alertIDs: []
    };
    const account = new Account(accountDOT);
    await account.validate();
    await this.account.add(account);
    req.url = req.url + "/" + account.id();
    return next();
  }
}
