import { Controller } from "@nestjs/common";
import InternalService from "./Internal.service";

export const prefix = "internal";

@Controller(prefix)
export class InternalController {

  constructor( private readonly internal: InternalService ) {}
  
}

export default InternalController;