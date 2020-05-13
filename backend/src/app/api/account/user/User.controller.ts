import { Controller } from "@nestjs/common";

export const prefix = "user";

@Controller(prefix)
export class UserController {
  
}

export default UserController;