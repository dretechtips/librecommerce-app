import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RestrictAccess } from "../../login/Login.decorator";
import { AccountType } from "../../../type/Type.interface";
import { AppealDOT } from "./Appeal.interface";
import { ValidateAppealIDPipe, ValidateAppealPipe } from "./Appeal.pipe";
import AppealService from "./Appeal.service";

export const prefix = "appeal";

@Controller(prefix)
export class AppealController {
  constructor(private readonly appeal: AppealService) {}
  @Post("create")
  @RestrictAccess(AccountType.USER, AccountType.CUSTOMER, AccountType.NONE)
  public async create(@Body(prefix, ValidateAppealPipe) appeal: AppealDOT) {
    return (await this.appeal.add(appeal)).toJSON();
  }

  @Get("fetch/:appealID")
  @RestrictAccess(AccountType.USER, AccountType.CUSTOMER, AccountType.NONE)
  public async fetch(
    @Param("appealID", ValidateAppealIDPipe) appealID: string
  ) {
    await this.appeal.get(appealID);
  }
}

export default AppealController;
