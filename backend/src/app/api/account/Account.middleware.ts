import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { prefix } from "./Account.controller";
import Account, { AccountClass } from "./Account.model";
import { IDOnly } from "src/util/Types";
import AccountService from "./Account.service";
import { PreAccountDOT, AccountDOT } from "./Account.interface";

/**
 * Adds Account into the database and updates the path to include the Account ID for use
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
