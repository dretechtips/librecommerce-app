import Mongoose from "mongoose";
import { OrderCompileType } from "../interface/Order.interface";
import Model from "./Model";
import Shipping from "./Shipping";
import Customer from "./Customer";
import Cart from "./Cart";
import { Transactable, SubCost } from "../interface/Transaction.interface";

const OrderRuntimeType: Mongoose.TypedSchemaDefinition<OrderCompileType> = {
  cancelled: Boolean,
  onHold: Boolean
};

const OrderSchema = new Mongoose.Schema<OrderCompileType>(OrderRuntimeType);

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
