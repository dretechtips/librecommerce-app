import Mongoose from "mongoose";
import { NewOrderData, OrderData } from "../interface/Order.interface";

export const NewOrderSchema = new Mongoose.Schema(NewOrderData);

export const NewOrder = Mongoose.model("New Order", NewOrderSchema);

export const OrderSchema = new Mongoose.Schema(OrderData);

export const Order = Mongoose.model("Order", OrderSchema);

export default Order;
