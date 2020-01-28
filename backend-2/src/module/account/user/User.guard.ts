import { AccountLoginGuard } from "./Account.guard";
import { prefix } from "../controller/User.controller";
import User from "src/model/User";

export class UserLoginGuard extends AccountLoginGuard {
  constructor() {
    super(prefix, User);
  }
}
