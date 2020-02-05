import { CustomerDOT } from "./Customer.interface";
import Mongoose from "mongoose";
import Model from "src/common/factory/Model.factory";
import Order from "src/api/order/Order.model";
import Payments from "src/api/transaction/payments/Payments.model";

const CustomerRuntimeType: Mongoose.TypedSchemaDefinition<CustomerDOT> = {
  accountID: String,
  orderIDs: [String],
  lastOrderDate: String,
  paymentsID: String
};

const CustomerSchema = new Mongoose.Schema<CustomerDOT>(CustomerRuntimeType);

export class Customer extends Model("Customer", CustomerSchema /*[Account]*/) {
  public async getOrders(): Promise<Order[] | null> {
    return Promise.all(
      this.data().orderIDs.map(id => Order.getSelfByID(id))
    ) as Promise<Order[] | null>;
  }
  public async getPayment(): Promise<Payments | null> {
    return Payments.getSelfByID(
      this.data().paymentsID
    ) as Promise<Payments | null>;
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
