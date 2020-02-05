import { Controller } from "@nestjs/common";
import { RestrictAccount } from "src/api/account/Account.decorator";

@Controller("appeal")
export class AppealController {
  @RestrictAccount("none")
  public create() {}
}

export default AppealController;
