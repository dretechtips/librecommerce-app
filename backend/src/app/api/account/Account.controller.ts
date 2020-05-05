import { Controller, Delete, Get, Param } from "@nestjs/common";
import AccountService from "./Account.service";
import { RestrictAccess } from "./util/login/Login.decorator";
import { AccountType } from "./type/Type.interface";

export const prefix = "account";

@Controller(prefix)
@RestrictAccess(AccountType.CUSTOMER, AccountType.USER)
export class AccountController {
  constructor(private readonly account: AccountService) {}
  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {
    return this.account.get(id).then(cur => cur.toJSON());
  }
  @Delete("disable/:id")
  public async disable(@Param("id") id: string) {
    await this.account.disable(id);
  }
}

export default AccountController;
