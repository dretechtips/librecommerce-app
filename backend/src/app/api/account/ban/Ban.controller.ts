import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RestrictAccess } from "../../login/Login.decorator";
import { AccountType } from "../type/Type.interface";
import { BanDOT } from "./Ban.interface";
import { ValidateBanPipe } from "./Ban.pipe";
import BanService from "./Ban.service";

export const prefix = "ban";

@Controller(prefix)
export class BanController {
  constructor(private readonly ban: BanService) {}
  @Post("create")
  @RestrictAccess(AccountType.USER)
  public async create(@Body(prefix, ValidateBanPipe) ban: BanDOT) {
    return (await this.ban.add(ban))._id;
  }
  @Get("fetch/:id")
  @RestrictAccess(AccountType.USER, AccountType.CUSTOMER, AccountType.NONE)
  public async fetch(@Param("id") id: string) {
    return (await this.ban.get(id)).toJSON();
  }
}

export default BanController;
