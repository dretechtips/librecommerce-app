import Mongoose from "mongoose";
import {
  TransactionDOT,
  Transactable,
  TransactionType
} from "./Transaction.interface";
import Model from "src/common/factory/Model.factory";
import Order from "../order/Order.model";
import Shipping from "../shipping/Shipping.model";
import { CustomerDOT } from "../account/customer/Customer.interface";
import { PayflowTransactionType } from "src/vendor/paypal/payflow/Payflow.interface";

const TransactionRuntimeType: Mongoose.TypedSchemaDefinition<TransactionDOT> = {
  ipAddress: String,
  amountOwed: Number,
  amountPayed: Number,
  type: String,
  tax: Number,
  charges: [{ cost: Number, name: String }]
};

const TransactionSchema = new Mongoose.Schema<TransactionDOT>(
  TransactionRuntimeType
);

export class Transaction extends Model(
  "Transaction",
  TransactionSchema,
  [],
  true
) {
  public toPayflowTransaction(): PayflowTransactionType | null {
    switch (this.data().type as TransactionType) {
      case "rebate":
        return PayflowTransactionType.REFUND;
      case "refund":
        return PayflowTransactionType.REFUND;
      case "sale":
        return PayflowTransactionType.SALE;
      default:
        return null;
    }
  }
  public async validate() {
    if (!this.validateType())
      throw new Error("This transaction is an invalid type");
    if (this.data().amountOwed < 0 || this.data().amountPayed < 0)
      throw new Error(
        "The transaction amount payed or owned cannot be bellow 0"
      );
  }
  private validateType() {
    switch (this.data().type as TransactionType) {
      case "sale":
        return true;
      case "refund":
        return true;
      case "rebate":
        return true;
      default:
        return false;
    }
  }
}

export default Transaction;
