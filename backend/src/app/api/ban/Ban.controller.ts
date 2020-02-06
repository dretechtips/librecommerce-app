import { Controller } from "@nestjs/common";
import { RestrictAccount } from "../account/Account.decorator";

@Controller("ban")
export class BanController {
  @RestrictAccount("admin")
  public create() {}
}

export default BanController;
