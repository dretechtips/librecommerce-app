import { Controller, Post, Next } from "@nestjs/common";
import AccountService from "../Account.service";

export const prefix = "user";

@Controller("user")
export class UserController {
  constructor(private readonly account: AccountService) {}
}

export default UserController;