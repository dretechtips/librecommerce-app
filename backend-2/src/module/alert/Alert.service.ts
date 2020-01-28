import { Injectable, Scope } from "@nestjs/common";
import { AlertDOT } from "./Alert.interface";

@Injectable({scope: Scope.REQUEST})
class AlertService {
  private alerts: AlertDOT[] = [];
  public add(alert: AlertDOT) {
    this.alerts.push(alert);
  }
  public addAll(alerts: AlertDOT[]) {
    this.alerts.push(...alerts);
  }
}
