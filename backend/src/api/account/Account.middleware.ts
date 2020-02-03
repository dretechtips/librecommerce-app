import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { prefix } from "./Account.controller";
import Account from "./Account.model";
import { IDOnly } from "src/util/Types";
import AccountService from "./Account.service";

export class CreateAccountMiddleware implements NestMiddleware {
  constructor(private readonly account: AccountService) {}
  public use(req: Request, res: Response, next: Function) {
    const account = new Account(req.body[prefix]);
    account.validate();
    this.account.tag.add(req, res, account.data());
    return next();
  }
}