import Mongoose from "mongoose";
import { BankCompileType } from "../interface/Bank.interface";
import Model from "../factory/Model";

const BankRuntimeType: Mongoose.TypedSchemaDefinition<BankCompileType> = {
  account: Number,
  routing: Number,
  country: String
};

const BankSchama = new Mongoose.Schema<BankCompileType>(BankRuntimeType);

export class Bank extends Model("Bank", BankSchama) {
  public async validate() {
    await super.validate();
    this.validateAccount();
    this.validateRouting();
  }
  public async validateAccount(): Promise<boolean> {
    // Call Paypal Bank Verification API
    return false;
  }
  public async validateRouting() {
    // Call Paypal Bank Verification API
    return false;
  }
}

export default Bank;
