import { createParamDecorator, UseInterceptors } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Login.controller";
import { AccountType } from "../account/Account.interface";
import { RestrictAccessInterceptor } from "./Login.interceptor";

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
