import Mongoose from "mongoose";
import { OrderDOT } from "./Order.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";

class OrderSchema extends Typegoose implements OrderDOT {
  @prop({ required: true })
  cancelled: boolean;
  @prop({ required: true })
  isHeld: boolean;
}

export const Order = ModelFactory(OrderSchema);

export default Order;
