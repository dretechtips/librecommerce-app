import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AccountType } from "../account/Account.interface";
import { RestrictAccess } from "../account/user/login/Login.decorator";
import { AlertDOT } from "./Alert.interface";
import { ValidateAlertFromAdmin } from "./Alert.pipe";
import AlertService from "./Alert.service";

export const prefix = "alert";

@Controller(prefix)
@RestrictAccess(AccountType.ADMIN, AccountType.CUSTOMER)
export class AlertController {
  constructor(private readonly alert: AlertService) {}
  @Get("fetch:/id")
  public async fetch(@Param("id") id: string) {
    return (await this.alert.get(id)).toJSON();
  }
  @Post("create")
  @RestrictAccess(AccountType.ADMIN)
  public async create(@Body(prefix, ValidateAlertFromAdmin) alert: AlertDOT) {
    await this.alert.add(alert);
  }
}

export default AlertController;
