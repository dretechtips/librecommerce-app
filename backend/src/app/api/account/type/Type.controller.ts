import { Controller } from "@nestjs/common";

export const prefix = "type";

@Controller(prefix)
export class TypeController {
  constructor() {}
}

export default TypeController;
