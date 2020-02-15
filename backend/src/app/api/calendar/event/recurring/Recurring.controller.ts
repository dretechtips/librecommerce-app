import { Controller, Get, Param } from "@nestjs/common";

export const prefix = "recurring";

@Controller(prefix)
export class RecurringController {
  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {}
}

export default RecurringController;
