import { Request } from "express";
import { UseInterceptors, createParamDecorator } from "@nestjs/common";
import { AccountType } from "./Account.interface";
import Account from "./Account.model";
import { RestrictAccountInteceptor } from "./Account.interceptor";
import { prefix as loginPrefix } from "../login/Login.controller";

export function RestrictAccount(...type: AccountType[]) {
  return UseInterceptors(
    class extends RestrictAccountInteceptor {
      protected allowed = [...type];
    }
  );
}

/**
 * @returns [AccountType]
 */
export const GetAccountType = createParamDecorator(
  async (data: any, req: Request) => {
    const accountID = this.login.getToken(req.ip, req.cookies[loginPrefix]);
    if (!accountID) throw new Error("Invalid IP Address and or Login ID.");
    const account = (await Account.getSelfByID(accountID)) as Account | null;
    if (!account)
      throw new Error(
        "AccountID is valid, however the database is not responding correctly."
      );
    const accountType = account.getType();
    return accountType;
  }
);
