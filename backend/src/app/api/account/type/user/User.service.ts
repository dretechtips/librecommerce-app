import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { TypeDependentService } from "../Type.interface";
import { NewUserDOT, UserDOT, UserPositions } from "./User.interface";
import User from "./User.model";

@Injectable()
export class UserService extends Service<typeof User>
  implements TypeDependentService {
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
  public async new(accountID: string, __new__: NewUserDOT): Promise<User> {
    // Create Empty Schedule
    // Create Empty Payroll
    const userDOT: UserDOT = {
      ...__new__,
      accountID: accountID,
      scheduleID: "scheduleID",
      lastPayed: new Date(),
      payrollID: ""
    };
    return await this.add(userDOT);
  }
}

export default UserService;
