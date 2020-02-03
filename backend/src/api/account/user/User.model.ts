import Mongoose from "mongoose";
import { UserCompileType } from "./User.interface";
import Model from "src/util/Model.factory";
import Payroll from "src/api/payroll/Payroll.model";
import { UserSchedule } from "src/api/schedule/Schedule";
import Account, { AccountRuntimeType } from "src/api/account/Account.model";

const UserRuntimeType: Mongoose.TypedSchemaDefinition<UserCompileType> = {
  accountID: String,
  scheduleID: String,
  payrollID: String,
  position: String,
  lastPayed: String
};

const UserSchema = new Mongoose.Schema<UserCompileType>(UserRuntimeType);

export class User extends Model<UserCompileType>(
  "User",
  UserSchema /*[
  Account
]*/
) {
  constructor(data: any) {
    super(data);
  }
  public async validate() {
    await super.validate();
    if (!Payroll.isValidID(this.data().payrollID))
      throw new Error("Invalid ID for User Payroll");
    if (!UserSchedule.isValidID(this.data().scheduleID))
      throw new Error("Invalid ID for User Schedule");
  }
}

export default User;
