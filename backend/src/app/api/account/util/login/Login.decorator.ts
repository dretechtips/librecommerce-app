import { createParamDecorator, SetMetadata } from "@nestjs/common";
import { Request } from "express";
import { AccountType } from "../../Account.interface";
import { prefix } from "./Login.controller";
import { LoginAccessGuard } from "./Login.guard";

/**
 * @returns string
 */
export const LoginID = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

/**
 * Restrict Account Access To HTTP Controller Path
 * @param roles AccountType
 */
export function RestrictAccess(...roles: AccountType[]) {
  return SetMetadata(LoginAccessGuard.MetadataKey, roles);
}

// /**
//  * Account Model
//  */
// export function AccessLoginAccount() {
//   return Cookie(
//     prefix,
//     ValidateLoginID,
//     GetAccountIDFromLoginID,
//     ExtractAccountDocFromID
//   );
// }

// /**
//  * Account Type
//  */
// export function AccessLoginAccountType() {
//   return Cookie(
//     prefix,
//     ValidateLoginID,
//     GetAccountIDFromLoginID,
//     ExtractAccountTypeFromID
//   );
// }
