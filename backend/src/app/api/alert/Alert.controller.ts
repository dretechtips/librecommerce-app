import { Controller, Get, Ip, Post, Body, Req } from "@nestjs/common";
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
  @Get("list")
  public async getList(
    @Ip() ip: string,
    @GetLoginFromCookie() loginID: string
  ) {
    const alerts = this.alert.getAlertsWithLoginToken(ip, loginID);
    if (alerts === null) throw new Error("Invalid IP or LoginID");
    return alerts;
  }
  @Post("create")
  @RestrictAccount("admin")
  public async create(
    @Body(prefix, ValidateAlertFromAdmin) alert: AlertDOT,
    @Body(accountPrefix, ValidateAccountIDs) accountIDs: IDsOnly
  ) {
    this.alert.broadcast(alert, AlertType.ADMIN, accountIDs.ids);
  }
  @Post("dismiss")
  public async dismiss(
    @Req() req: Request,
    @Body(prefix, ValidateAlertID) alertID: IDOnly
  ) {
    await this.alert.dismissSelf(req, alertID.id);
  }
}

export default AlertController;
