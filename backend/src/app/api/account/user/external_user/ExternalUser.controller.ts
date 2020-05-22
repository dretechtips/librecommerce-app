import { Controller, Post, Param } from "@nestjs/common";
import ExternalUserService from "./ExternalUser.service";

export const prefix = "external_user";

@Controller(prefix)
export class ExternalUserController {

  constructor(private readonly external: ExternalUserService) {}
  
}

export default ExternalUserController;