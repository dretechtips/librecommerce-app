import Mongoose from "mongoose";
import {
  TransactionCompileType,
  CustomerTransactionCompileType
} from "../interface/Transaction.interface";
import Model from "../factory/Model";
import Order from "./Order";
import Shipping from "./Shipping";
import { threadId } from "worker_threads";

const TransactionRuntimeType: Mongoose.TypedSchemaDefinition<TransactionCompileType> = {
  ipAddress: String,
  amountOwed: Number,
  amountPayed: Number,
  type: String
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
    switch (this.data().type) {
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

const CustomerTransactionRuntimeType: Mongoose.TypedSchemaDefinition<CustomerTransactionCompileType> = {
  ...TransactionRuntimeType,
  orderID: String,
  shippingID: String
};

const CustomerTransactionSchema = new Mongoose.Schema<
  CustomerTransactionCompileType
>(CustomerTransactionRuntimeType);

export class CustomerTransaction extends Model(
  "Customer Transaction",
  CustomerTransactionSchema,
  [Transaction]
) {
  public async getOrder() {
    return Order.getSelfByID(this.data().orderID);
  }
  public async getShipping() {
    return Shipping.getSelfByID(this.data().shippingID);
  }
  public async validate() {
    await super.validate();
    if (!Order.isValidID(this.data().orderID))
      throw new Error("Customer Transaction Order ID is invalid");
    if (!Shipping.isValidID(this.data().shippingID))
      throw new Error("Customer Transaction Shipping ID is invalid");
  }
}
