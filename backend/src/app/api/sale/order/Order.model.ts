import ModelFactory from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import { OrderDOT } from "./Order.interface";

class OrderSchema implements OrderDOT {
  @prop({ required: true, default: false })
  public cancelled: boolean;
  @prop({ required: true, default: false })
  public isHeld: boolean;
  @prop({ required: true, default: false })
  public isComplete: boolean;

  public hold() {
    this.isHeld = true;
  }

  public unhold() {
    this.isHeld = false;
  }

  public complete() {
    this.isComplete = true;
  }

  public cancel() {
    this.cancelled = true;
  }
}

export class Order extends ModelFactory(OrderSchema) {}

export default Order;
