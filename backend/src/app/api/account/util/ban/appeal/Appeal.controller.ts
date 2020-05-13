import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RestrictAccess } from "../../login/Login.decorator";
import { AppealDOT } from "./Appeal.interface";
import { ValidateAppealIDPipe, ValidateAppealPipe } from "./Appeal.pipe";
import AppealService from "./Appeal.service";
import { AccountType } from "../../../Account.interface";

export const prefix = "appeal";

@Controller(prefix)
export class AppealController {

  constructor(private readonly appeal: AppealService) {}
  
  @Post("create")
  @RestrictAccess(AccountType.EMPLOYEE, AccountType.CUSTOMER, AccountType.NONE)
  public async create(@Body(prefix, ValidateAppealPipe) appeal: AppealDOT) {
    return (await this.appeal.add(appeal)).toJSON();
  }

  @Get("fetch/:appealID")
  @RestrictAccess(AccountType.EMPLOYEE, AccountType.CUSTOMER, AccountType.NONE)
  public async fetch(
    @Param("appealID", ValidateAppealIDPipe) appealID: string
  ) {
    await this.appeal.get(appealID);
  }
  
}

export default AppealController;
