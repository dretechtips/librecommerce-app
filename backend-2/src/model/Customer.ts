import { CustomerCompileType } from "../interface/Customer.interface";
import Account, { AccountRuntimeType } from "../model/Account";
import Mongoose from "mongoose";
import Model from "./Model";
import Order from "./Order";
import Payment from "./Payment";

const CustomerRuntimeType: Mongoose.TypedSchemaDefinition<CustomerCompileType> = {
  ...AccountRuntimeType,
  orderIDs: [String],
  lastOrderDate: String,
  paymentID: String
};

const CustomerSchema = new Mongoose.Schema<CustomerCompileType>(
  CustomerRuntimeType
);

export class Customer extends Model("Customer", CustomerSchema /*[Account]*/) {
  public async getOrders(): Promise<Order[] | null> {
    return Promise.all(
      this.data().orderIDs.map(id => Order.getSelfByID(id))
    ) as Promise<Order[] | null>;
  }
  public async getPayment(): Promise<Payment | null> {
    return Payment.getSelfByID(
      this.data().paymentID
    ) as Promise<Payment | null>;
  }
  public async validate() {
    await super.validate();
    const isValidOrders = await Promise.all(
      this.data().orderIDs.map(id => Order.isValidID(id))
    );
    if (isValidOrders.filter(order => false).length > 0)
      throw new Error("Customer has an invalid order ID");
  }
}

export default Customer;
