import { Injectable, Inject, forwardRef } from "@nestjs/common";
import User from "./User.model";
import { UserDOT, UserPositions } from "./User.interface";
import { AccountDOT, AccountTypeService } from "../Account.interface";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class UserService extends Service<typeof User>
  implements AccountTypeService {
  constructor() {
    super(User);
  }
  public isAccountType(accountID: string): Promise<boolean> {
    return this.findAllByProp("accountID", accountID)
      .then(cur => true)
      .catch(cur => false);
  }
  public getPositions(): string[] {
    return Object.keys(UserPositions);
  }
  public async new(accountID: string): Promise<User> {
    // Create Empty Schedule
    // Create Empty Payroll
    const userDOT: UserDOT = {
      accountID: accountID,
      scheduleID: "scheduleID",
      position: "NONE",
      lastPayed: "",
      payrollID: ""
    };
    return await this.add(userDOT);
  }
}

export default UserService;
