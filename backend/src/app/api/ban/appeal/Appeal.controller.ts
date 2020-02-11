import { Controller, Post } from "@nestjs/common";
import { RestrictAccount } from "src/app/api/account/Account.decorator";
import AppealService from "./Appeal.service";

@Controller("appeal")
export class AppealController {
  constructor(private readonly appeal: AppealService) {}
  @Post("create")
  @RestrictAccount("none")
  public create() {}
}

export default AppealController;
