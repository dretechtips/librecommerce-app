import { CustomerCompileType } from "../interface/Customer.interface";
import Account, { AccountRuntimeType } from "../model/Account";
import Mongoose from "mongoose";
import Model from "../factory/Model";
import Order from "./Order";

const CustomerRuntimeType: Mongoose.TypedSchemaDefinition<CustomerCompileType> = {
  ...AccountRuntimeType,
  orderIDs: [String],
  lastOrderDate: String
};

const CustomerSchema = new Mongoose.Schema<CustomerCompileType>(
  CustomerRuntimeType
);

export class Customer extends Model("Customer", CustomerSchema, [Account]) {
  public async getOrders(): Promise<Order[] | null> {
    return Promise.all(
      this.data().orderIDs.map(id => Order.getSelfByID(id))
    ) as Promise<Order[] | null>;
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
