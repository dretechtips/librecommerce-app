import Mongoose from "mongoose";
import {
  TransactionCompileType,
  CustomerTransactionCompileType,
  Transactable,
  TransactionType
} from "../interface/Transaction.interface";
import Model from "../factory/Model";
import Order from "./Order";
import Shipping from "./Shipping";
import { CustomerCompileType } from "../interface/Customer.interface";

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
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private static taxRate: number = 0.0725;
  public static async calcTotalPrice(
    transactable: Transactable[]
  ): Promise<number> {
    const charges = await Promise.all(
      transactable.map(cur => cur.getCharges())
    );
    return Number(
      (
        charges.reduce(
          (prev, cur) => prev + cur.reduce((prev, cur) => prev + cur.cost, 0),
          0
        ) *
          Transaction.taxRate +
        1
      ).toFixed(2)
    );
  }
  public static async calcTaxPrice(
    transactable: Transactable[]
  ): Promise<number> {
    const charges = await Promise.all(
      transactable.map(cur => cur.getCharges())
    );
    return Number(
      (
        charges.reduce(
          (prev, cur) => prev + cur.reduce((prev, cur) => prev + cur.cost, 0),
          0
        ) * Transaction.taxRate
      ).toFixed(2)
    );
  }
  public static async calcSubtotalPrice(
    transactable: Transactable[]
  ): Promise<number> {
    const charges = await Promise.all(
      transactable.map(cur => cur.getCharges())
    );
    return Number(
      charges
        .reduce(
          (prev, cur) => prev + cur.reduce((prev, cur) => prev + cur.cost, 0),
          0
        )
        .toFixed(2)
    );
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
