import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { RestrictAccess } from "../login/Login.decorator";
import { AccountDOT } from "./Account.interface";
import AccountModule from "./Account.module";
import { ValidateAccount } from "./Account.pipe";
import AccountService from "./Account.service";

export const prefix = "account";

@Controller(prefix)
@RestrictAccess(...AccountModule.ALLOW_ACCESS)
export class AccountController {
  constructor(private readonly account: AccountService) {}
  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {
    return this.account.get(id).then(cur => cur.toJSON());
  }
  @Delete("disable/:id")
  public async disable(@Param("id") id: string) {
    await this.disable(id);
  }
  @Patch("update/:id")
  public async update(
    @Param("id") id: string,
    @Body(prefix, ValidateAccount) account: AccountDOT
  ) {
    await this.account.update(id, account);
  }
}

export default AccountController;
