import Mongoose from "mongoose";
import { OrderDOT } from "./Order.interface";
import Model from "src/common/factory/Model.factory";
import Shipping from "src/api/shipping/Shipping.model";
import Customer from "src/api/account/customer/Customer.model";
import Cart from "src/api/cart/Cart.model";
import {
  Transactable,
  SubCost
} from "src/api/transaction/Transaction.interface";

const OrderRuntimeType: Mongoose.TypedSchemaDefinition<OrderDOT> = {
  cancelled: Boolean,
  onHold: Boolean
};

const OrderSchema = new Mongoose.Schema<OrderDOT>(OrderRuntimeType);

class Order extends Model("Order", OrderSchema) {
  constructor(data: any) {
    super(data);
  }
  public async isCustomer(): Promise<boolean> {
    // Call Customer Model
    return false;
  }
  public enableHold(): void {
    this.data().onHold = true;
  }
  public disableHold(): void {
    this.data().onHold = false;
  }
}

export default Order;
