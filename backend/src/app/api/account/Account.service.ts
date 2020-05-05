import { Injectable } from "@nestjs/common";
import { Document } from "mongoose";
import BanService from "./util/ban/Ban.service";
import Service from "src/app/common/service/Service.factory";
import { Account } from "./Account.model";
import LoginService from "./util/login/Login.service";

/**
 * @todo Get Account Type
 */

@Injectable()
export class AccountService extends Service<typeof Account>  {
  constructor(private readonly ban: BanService, private readonly login: LoginService) {
    super(Account);
  }
  /**
   * `NOTE:` You can only register GLOBAL scope services
   * @param typeID 3 Letter Type ID
   * @param service Service That Going To Get Registered
   * @param postfix Postfixed used to prevent duplicate service keys
   */
  public register(
    type: AccountType,
    service: InstanceType<ReturnType<typeof AccountBasedServiceFactory>>
  ): void {
    if (this.accounts.get(type) === undefined)
      throw new Error("Duplicate Type has been registered. [" + type + "]");
    this.accounts.set(type, service);
  }
  public async fetch(
    accountID: string
  ): Promise<AccountDependentDOT | Document> {
    const ids = this.tokenizeID(accountID);
    const service = this.accounts.get(ids.type);
    if (!service) throw new Error("Invalid Type ID");
    const doc = service.findOneByQuery({ ["account.id"]: accountID });
    if (!doc) throw new Error("Unable to find accountID");
    return doc as Promise<AccountDependentDOT | Document>;
  }

  public async disable(accountID: string): Promise<void> {
    const parseID = this.tokenizeID(accountID);
    const service = this.accounts.get(parseID.type);
    if (!service) throw new Error("Invalid Account Type ID");
    const doc = await this.get(accountID);
    return service.disable(doc);
  }

  public async getType(accountID: string) {
    const parsedID = this.tokenizeID(accountID);
    return parsedID.type;
  }

  public async isBan(accountID: string): Promise<boolean> {
    const bans = await this.ban.findAllByProp("accountID", accountID);
    if (bans[0]) {
      const ban = bans[0];
      return !ban.revoke;
    }
    return false;
  }
  private tokenizeID(id: string): { type: AccountType; subID: string } {
    const ids = id.split("-");
    if (AccountType[ids[0]] === undefined)
      throw new Error("Invalid Account Type");
    if (ids.length > 2) throw new Error("Invalid ID");
    return {
      type: ids[0] as AccountType,
      subID: ids[1]
    };
  }

  // public login() {}
}

export default AccountService;
