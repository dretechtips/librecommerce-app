import Mongoose from "mongoose";
import { BillingCompileType } from "./Billing.interface";
import Model from "src/common/factory/Model.factory";

const BillingRuntimeType: Mongoose.TypedSchemaDefinition<BillingCompileType> = {
  ipAddress: String,
  start: String,
  end: String,
  transactionIDs: [String]
};

const BillingSchema = new Mongoose.Schema<BillingCompileType>(
  BillingRuntimeType
);

export class Billing extends Model("Billing", BillingSchema) {
  public static readonly getAllTransactionType = function() {
    return [CustomerTransaction];
  };
  public static readonly getTransactionType = function(
    type: TransactionClassType
  ) {
    switch (type) {
      case "customer":
        return CustomerTransaction;
      default:
        return null;
    }
  };
  public async validate() {
    await super.validate();
    const transactionType = Billing.getAllTransactionType();
    // Promise.all(this.data().transactionIDs
    //.map(id => ))
  }
}
