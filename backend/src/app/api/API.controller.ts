import { Controller, UseGuards } from "@nestjs/common";
import { AccountType } from "./account/Account.interface";
import { RestrictAccess } from "./account/util/login/Login.decorator";
import { LoginAccessGuard } from "./account/util/login/Login.guard";

export const prefix = "api";

@Controller(prefix)
@UseGuards(LoginAccessGuard)
@RestrictAccess(AccountType.ADMIN, AccountType.CUSTOMER)
export class APIController {}

export default APIController;
