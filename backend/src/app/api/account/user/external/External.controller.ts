import { Controller, Post, Param } from "@nestjs/common";
import ExternalService from "./External.service";

export const prefix = "external";

@Controller(prefix)
export class ExternalController {

  constructor(private readonly external: ExternalService) {}
  
}

export default ExternalController;