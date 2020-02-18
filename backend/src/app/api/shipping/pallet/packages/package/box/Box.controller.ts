import { Controller, Post, Delete, Patch } from "@nestjs/common";
import BoxService from "./Box.service";

export const prefix = "box";

@Controller(prefix)
export class BoxController {
  constructor(private readonly box: BoxService) {}
  @Post("create")
  public create() {}
  @Delete("delete")
  public remove() {}
  @Patch("use/:id")
  public use() {}
}

export default BoxController;
