import { Controller } from "@nestjs/common";
import InternalService from "./InternalUser.service";

export const prefix = "internal_user";

@Controller(prefix)
export class InternalUserController {

  constructor( private readonly internal: InternalService ) {}
  
}

export default InternalUserController;