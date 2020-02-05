import Mongoose from "mongoose";
import { BankDOT } from "./Bank.interface";
import Model from "../../../../common/factory/Model.factory";
import { PaymentOption } from "../Payments.interface";
import Transaction from "../../Transaction.model";
import {
  PayflowCorePayment,
  PayflowTender,
  PayflowTransactionType
} from "src/vendor/paypal/payflow/Payflow.interface";

const BankRuntimeType: Mongoose.TypedSchemaDefinition<BankDOT> = {
  account: Number,
  routing: Number,
  country: String
};

const BankSchama = new Mongoose.Schema<BankDOT>(BankRuntimeType);

export class Bank extends Model("Bank", BankSchama) implements PaymentOption {
  public toPayflow(transaction: Transaction): PayflowCorePayment {
    const TRXTYPE = transaction.toPayflowTransaction();
    if (!TRXTYPE) throw new Error("Invalid Transaction Type");
    return {
      TENDER: PayflowTender.ACH,
      TRXTYPE: TRXTYPE,
      ACCT: this.data().account,
      AMT: transaction.data().amountPayed
    };
  }
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
