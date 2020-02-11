import { Controller, Post, Param, Body, Res, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { AccountType, AccountDOT, PreAccountDOT } from "./Account.interface";
import AccountService from "./Account.service";
import { RestrictAccount } from "./Account.decorator";

export const prefix = "account";

@Controller(prefix)
export class AccountController {
  constructor(private readonly account: AccountService) {}
}

export default AccountController;
