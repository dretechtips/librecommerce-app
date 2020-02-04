import Mongoose from "mongoose";
import { AccountDOT, AccountType } from "./Account.interface";
import Model from "src/util/Model.factory";
import { Alert } from "../alert/Alert.model";

export const AccountRuntimeType: Mongoose.TypedSchemaDefinition<AccountDOT> = {
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  associatedIPs: [String],
  emailAddress: String,
  phoneNum: String,
  address: String,
  alertIDs: [String]
};

const AccountSchema = new Mongoose.Schema<AccountDOT>(AccountRuntimeType);

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
  /**
   * @todo Get Type from Model through relations.
   */
  public async getType(): Promise<AccountType> {
    return "admin";
  }
  public async getAlerts(): Promise<Alert[] | null> {}
  public async addAlert(alert: Alert) {
    this.data().alertIDs.push(alert.id());
  }
  public async removeAlert(alertID: string) {
    this.data().alertIDs = this.data().alertIDs.filter(cur => cur !== alertID);
  }
}

export default Account;
