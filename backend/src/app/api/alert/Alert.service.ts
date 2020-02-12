import { Injectable, Scope, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Document } from "mongoose";
import { AlertDOT, AlertType, AlertContainer } from "./Alert.interface";
import Alert from "./Alert.model";
import Account from "../account/Account.model";
import Service from "src/app/common/service/Service.factory";
import LoginService from "../login/Login.service";

@Injectable()
export class AlertService extends Service<Alert> implements OnModuleInit {
  private login: LoginService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Alert);
  }
  public onModuleInit() {
    this.login = this.moduleRef.get(LoginService);
  }
  public async getAlerts(container: AlertContainer): Promise<Alert[] | null> {
    const alertIDs = container.alertIDs;
    const alerts = await this.getAll(alertIDs);
    return alerts;
  }
  public async broadcast(
    alertDOT: AlertDOT,
    target: (AlertContainer & Document)[]
  ): Promise<void> {
    const alerts = await this.add(alertDOT);
    target.forEach(cur => cur.alertIDs.push(alerts.id));
    return target.forEach(cur => cur.save());
  }
  public async dismiss(
    container: AlertContainer & Document,
    alertID: string
  ): Promise<void> {
    container.alertIDs = container.alertIDs.filter(cur => cur !== alertID);
    await container.save();
  }
}

export default AlertService;
