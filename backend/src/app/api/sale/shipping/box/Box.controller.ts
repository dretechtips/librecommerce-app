import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { RestrictAccess } from "src/app/api/account/user/login/Login.decorator";
import { AccountsType } from "src/app/api/account/type/Type.interface";
import { BoxDOT } from "./Box.interface";
import { ValidateBoxIDPipe, ValidateBoxPipe } from "./Box.pipe";
import BoxService from "./Box.service";

export const prefix = "box";

@Controller(prefix)
@RestrictAccess(AccountType.USER)
export class BoxController {
  constructor(private readonly box: BoxService) {}
  @Get("fetch/:id")
  public fetch(@Param("id") id: string) {
    return this.box.get(id);
  }
  @Post("create")
  public async create(@Body(prefix, ValidateBoxPipe) box: BoxDOT) {
    return (await this.box.add(box))._id;
  }
  @Patch("use/:id")
  public async use(@Param("id") id: string) {
    const box = await this.box.get(id);
    box.quantity = box.quantity - 1;
    if (box.quantity < 0) box.quantity = 0;
    await box.save();
  }
  @Patch("update/:id")
  public async update(
    @Param("id", ValidateBoxIDPipe) boxID: string,
    @Body(prefix, ValidateBoxPipe) boxDOT: BoxDOT
  ) {
    await this.box.update(boxID, boxDOT);
  }
}

export default BoxController;
