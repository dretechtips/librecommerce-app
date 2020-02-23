import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { OrderDOT } from "./Order.interface";

class OrderSchema extends Typegoose implements OrderDOT {
  @prop({ required: true })
  public cancelled: boolean;
  @prop({ required: true })
  public isHeld: boolean;
  @prop({ required: true, default: false })
  public complete: boolean;
}

export class Order extends ModelFactory(OrderSchema) {}

export default Order;
