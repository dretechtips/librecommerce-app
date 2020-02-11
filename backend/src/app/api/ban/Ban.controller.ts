import { Controller, Body, Post, Param, Get } from "@nestjs/common";
import { prefix as accountPrefix } from "src/app/api/account/Account.controller";
import { ValidateAccountID } from "../account/Account.pipe";
import { AccountDOT } from "../account/Account.interface";
import BanService from "./Ban.service";
import { ValidateBanPipe } from "./Ban.pipe";
import { BanDOT } from "./Ban.interface";

export const prefix = "ban";

@Controller(prefix)
export class BanController {
  constructor(private readonly ban: BanService) {}
  @Post("create")
  @RestrictAccount("admin")
  public async create(@Body(prefix, ValidateBanPipe) ban: BanDOT) {
    return (await this.ban.add(ban)).id();
  }
  @Get("fetch/:id")
  public async fetch(@Param("id") id: string) {
    return (await this.ban.get(id)).toJSON();
  }
}

export default BanController;
