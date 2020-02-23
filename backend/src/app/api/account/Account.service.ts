import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Account from "./Account.model";
import BanService from "./ban/Ban.service";
import CustomerService from "./type/customer/Customer.service";
import { AccountType, TypeDependentService } from "./type/Type.interface";
import UserService from "./type/user/User.service";

/**
 * @todo Get Account Type
 */

@Injectable()
export class AccountService extends Service<typeof Account> {
  private types: Map<AccountType, TypeDependentService>;
  constructor(
    private readonly customer: CustomerService,
    private readonly user: UserService,
    private readonly ban: BanService
  ) {
    super(Account);
    this.setTypes();
  }
  public async disable(id: string): Promise<void> {
    const account = await this.get(id);
    account.active = false;
    await account.save();
  }
  private setTypes() {
    this.types.set(AccountType.CUSTOMER, this.customer);
    this.types.set(AccountType.USER, this.user);
  }
  public async getAccountsFromFingerprint(fingerprintID: string) {
    return this.findAllByArrayValue("fingerprints", fingerprintID);
  }
  public async getAccountType(accountID: string): Promise<AccountType> {
    await this.get(accountID);
    return new Promise(async (res, rej) => {
      await Promise.all(
        Array.from(this.types.entries()).map(cur => [
          cur[0],
          cur[1]
            .isAccountType(accountID)
            .then(bool => res(cur[0]))
            .catch()
        ])
      );
      rej("No account type was linked to the account ID");
    });
  }
  public async isBan(accountID: string): Promise<boolean> {
    const bans = await this.ban.findAllByProp("accountID", accountID);
    if (bans[0]) {
      const ban = bans[0];
      return !ban.revoke;
    }
    return false;
  }
}

export default AccountService;
