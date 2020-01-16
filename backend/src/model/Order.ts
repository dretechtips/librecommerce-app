import Mongoose from "mongoose";
import { OrderCompileType } from "../interface/Order.interface";
import Model from "../factory/Model";
import Shipping from "./Shipping";

const OrderRuntimeType: Mongoose.TypedSchemaDefinition<OrderCompileType> = {
  customerID: String,
  shippingID: String,
  cartID: String,
  cancelled: Boolean,
  cost: Number,
  onHold: Boolean
};

const OrderSchema = new Mongoose.Schema<OrderCompileType>(OrderRuntimeType);

class Order extends Model("Order", OrderSchema) {
  constructor(data: any) {
    super(data);
  }
  public async getShipping(): Promise<Shipping | null> {
    return this.getById(Shipping, this.data().shippingID);
  }
  public async getCart(): Promise<void> {}
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
  public async getCost(): Promise<void> {
    const cart = await this.getCart();
    // Once you get cart do the caluclations
  }
}

export default Order;
