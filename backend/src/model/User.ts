import Mongoose from "mongoose";
import { UserCompileType } from "../interface/User.interface";
import { AccountRuntimeType } from "../model/Account";
import Model from "../factory/Model";
import Payroll from "./Payroll";
import { UserSchedule } from "./Schedule";
import Account from "./Account";

const UserRuntimeType: Mongoose.TypedSchemaDefinition<UserCompileType> = {
  ...AccountRuntimeType,
  scheduleID: String,
  payrollID: String,
  position: String,
  lastPayed: String
};

const UserSchema = new Mongoose.Schema<UserCompileType>(UserRuntimeType);

export class User extends Model<UserCompileType>("User", UserSchema, [
  Account
]) {
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
