import Mongoose from "mongoose";
import {
  TransactionCompileType,
  CustomerTransactionCompileType,
  Transactable,
  TransactionType
} from "./Transaction.interface";
import Model from "src/util/Model.factory";
import Order from "../order/Order.model";
import Shipping from "../shipping/Shipping.model";
import { CustomerDOT } from "../account/customer/Customer.interface";

const TransactionRuntimeType: Mongoose.TypedSchemaDefinition<TransactionCompileType> = {
  ipAddress: String,
  amountOwed: Number,
  amountPayed: Number,
  type: String,
  tax: Number,
  charges: [{ cost: Number, name: String }]
};

const TransactionSchema = new Mongoose.Schema<TransactionCompileType>(
  TransactionRuntimeType
);

export class Transaction extends Model(
  "Transaction",
  TransactionSchema,
  [],
  true
) {
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
      case "sales":
        return true;
      case "refund":
        return true;
      case "rebate":
        return true;
      default:
        return false;
    }
  }
  public pay(customer: CustomerCompileType) {
    customer.
  }
}

export default Transaction;
