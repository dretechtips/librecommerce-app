import { Controller } from "@nestjs/common";
import LoginService from "./Login.service";

export const prefix = "login";

@Controller(prefix)
export class LoginController {
  
  constructor(private readonly login: LoginService) {}

}

export default LoginController;