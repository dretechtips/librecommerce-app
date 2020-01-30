import { Controller } from "@nestjs/common";

export const prefix = "login";

@Controller("login")
export class LoginController {
  public login() {}
}

export default LoginController;
