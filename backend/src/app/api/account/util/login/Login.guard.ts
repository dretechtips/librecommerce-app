import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountType } from "../../type/Type.interface";
import LoginService from "./Login.service";

/**
 * Responsible for resticting access to specific account based role
 */
@Injectable()
export class LoginAccessGuard implements CanActivate {
  public static readonly MetadataKey = Symbol();
  constructor(
    private readonly login: LoginService,
    private readonly reflector: Reflector
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.verifyAccountType(context);
    await this.verifyAccountBan(context);
    return true;
  }
  private async verifyAccountType(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<AccountType[]>(
      "roles",
      context.getHandler()
    );

    const type = await this.login.getOwnAccountType(req);
    if (roles.filter(cur => cur === type).length === 0)
      throw new Error("Unauthorized Access");
  }
  private async verifyAccountBan(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const isBan = await this.login.isOwnAccountBanned(req);
    if (isBan) throw new Error("Login Account Is Banned");
  }
}
