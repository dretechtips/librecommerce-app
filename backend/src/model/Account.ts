import Mongoose from "mongoose";
import { AccountCompileType } from "../interface/Account.interface";
import Model from "../factory/Model";

export const AccountRuntimeType: Mongoose.TypedSchemaDefinition<AccountCompileType> = {
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  associatedIPs: [String],
  emailAddress: String,
  phoneNum: String,
  address: String,
  alerts: [String]
};

const AccountSchema = new Mongoose.Schema<AccountCompileType>(
  AccountRuntimeType
);

export class Account extends Model("Account", AccountSchema, [], true) {
  public async validate() {
    await super.validate();
    if (this.data().firstName.length > 15)
      throw new Error(
        "Account first name should not be over 15 characters long."
      );
    if (this.data().lastName.length > 15)
      throw new Error(
        "Account last name should not be over 15 characters long."
      );
  }
}

export default Account;
