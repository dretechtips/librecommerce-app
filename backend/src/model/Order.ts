import Mongoose from "mongoose";
import { OrderCompileType } from "../interface/Order.interface";
import Model from "../factory/Model";
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
    if (!this.data().shippingID) this.data().shippingID = "NULL";
  }
  public async getShipping(): Promise<Shipping | null> {
    return Shipping.getSelfByID(
      this.data().shippingID
    ) as Promise<Shipping | null>;
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
  public async validate() {
    await super.validate();
    if (!Customer.isValidID(this.data().customerID))
      throw new Error("Order's customer ID is invalid");
    if (!Cart.isValidID(this.data().cartID))
      throw new Error("Order's cart ID is invalid");
    if (!(this.data().shippingID === "NULL"))
      if (!Shipping.isValidID(this.data().cartID))
        throw new Error("Order's shipping ID is invalid");
  }
}

export default Order;
