import { createParamDecorator, UseInterceptors, Body } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Login.controller";
import { AccountType } from "../account/Account.interface";
import { RestrictAccessInterceptor } from "./Login.interceptor";
import { Cookie } from "src/app/common/decorator/Decorator.utility";
import { ValidateLoginID, GetAccountIDFromLoginID } from "./Login.pipe";
import { ExtractAccountDocFromID } from "../account/Account.pipe";

/**
 * @returns string
 */
export const GetLoginFromCookie = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

export function RestrictAccess(...accountType: AccountType[]) {
  return UseInterceptors(
    class Interceptor extends RestrictAccessInterceptor {
      public allowed = accountType;
    }
  );
}

export function AccessLoginAccount() {
  return Cookie(
    prefix,
    ValidateLoginID,
    GetAccountIDFromLoginID,
    ExtractAccountDocFromID
  );
}
