import { createParamDecorator, SetMetadata } from "@nestjs/common";
import { Request } from "express";
import { AccountType } from "../../Account.interface";
import { prefix } from "./Login.controller";
import { LoginAccessGuard } from "./Login.guard";
import Account from "../../Account.model";

/**
 * @returns string
 */
export const LoginID = createParamDecorator((data: any, req: Request) => {
  return req.cookies[prefix];
});

/**
 * Restrict Account Access To HTTP Controller Path
 * @param roles AccountType
 */
export function RestrictAccess(...roles: typeof Account[]) {
  return SetMetadata(LoginAccessGuard.MetadataKey, roles);
}
