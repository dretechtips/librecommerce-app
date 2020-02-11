import { Controller, Get, Ip, Post, Body, Req, Param } from "@nestjs/common";
import { Request } from "express";
import { GetLoginFromCookie } from "../login/Login.decorator";
import AlertService from "./Alert.service";
import { RestrictAccount } from "../account/Account.decorator";
import { ValidateAlertFromAdmin, ValidateAlertID } from "./Alert.pipe";
import { AlertDOT, AlertType } from "./Alert.interface";
import { prefix as accountPrefix } from "src/app/api/account/Account.controller";
import { IDsOnly, IDOnly } from "src/util/Types";
import { ValidateAccountIDs } from "../account/Account.pipe";

export const prefix = "alert";

@Controller(prefix)
export class AlertController {
  constructor(private readonly alert: AlertService) {}
  @Get("fetch:/id")
  public async fetch(@Param("id") id: string) {
    return (await this.alert.get(id)).toJSON();
  }
}

export default AlertController;
