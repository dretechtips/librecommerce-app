import { Injectable, Scope } from "@nestjs/common";
import { Request } from "express";
import { AlertDOT, AlertType } from "./Alert.interface";
import { Alert } from "./Alert.model";
import Account from "../account/Account.model";
import LoginService from "../login/Login.service";
import AccountService from "../account/Account.service";

@Injectable()
export class AlertService {
  constructor(
    private readonly login: LoginService,
    private readonly account: AccountService
  ) {}
  public async getAlerts(account: Account): Promise<Alert[] | null> {
    return account.getAlerts();
  }
  public async getAlertsWithLoginToken(
    ip: string,
    loginID: string
  ): Promise<Alert[] | null> {
    const account = await this.login.getAccount(ip, loginID);
    if (!account) return null;
    return await this.getAlerts(account);
  }
  public async broadcast(
    alert: Omit<AlertDOT, "type">,
    type: AlertType,
    accountIDs: string[]
  ): Promise<void> {
    const alertDOT: AlertDOT = {
      ...alert,
      type: type
    };
    await this.add(alertDOT);
    const accounts = await this.getAccounts(accountIDs);
    if (accounts === null) throw new Error("Invalid Account ID");
    accounts.forEach(account => account.addAlert(new Alert(alert)));
  }
  private async add(alertDOT: AlertDOT) {
    const alert = new Alert(alertDOT);
    await alert.validate();
    alert.save();
  }
  public getAccounts(ids: string[]) {
    return this.account.getAccounts(ids);
  }
  public async dismissSelf(req: Request, alertID: string) {
    const account = await this.login.getOwnAccount(req);
    if (!account) throw new Error("Invalid Login Token");
    await account.removeAlert(alertID);
  }
}

export default AlertService;
