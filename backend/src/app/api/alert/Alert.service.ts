import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Document } from "mongoose";
import Service from "src/app/common/service/Service.factory";
import { AlertDependentDOT, AlertDOT } from "./Alert.interface";
import Alert from "./Alert.model";

@Injectable()
export class AlertService extends Service<typeof Alert> {
  constructor(private readonly moduleRef: ModuleRef) {
    super(Alert);
  }
  public async getAlerts(
    container: AlertDependentDOT
  ): Promise<Alert[] | null> {
    const alertIDs = container.alertIDs;
    const alerts = await this.getAll(alertIDs);
    return alerts;
  }
  public async broadcast(
    alertDOT: AlertDOT,
    target: (AlertDependentDOT & Document)[]
  ): Promise<void> {
    const alerts = await this.add(alertDOT);
    target.forEach(cur => cur.alertIDs.push(alerts.id));
    return target.forEach(cur => cur.save());
  }
  /**
   * @todo
   * @param alertDOT AlertDOT
   */
  public async broadcastToAll(alertDOT: AlertDOT): Promise<void> {}
  public async dismiss(
    container: AlertDependentDOT & Document,
    alertID: string
  ): Promise<void> {
    container.alertIDs = container.alertIDs.filter(cur => cur !== alertID);
    await container.save();
  }
}

export default AlertService;
