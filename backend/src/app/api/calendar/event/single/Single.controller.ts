import { Controller, Get, Param } from "@nestjs/common";

export const prefix = "single";

@Controller(prefix)
export class SingleController {
  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {}
}

export default SingleController;
