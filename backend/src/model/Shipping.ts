import Mongoose from "mongoose";
import {
  INewShippingModel,
  IShippingModel,
  INewShipping
} from "../interface/Shipping.interface";

export const NewShippingSchema = new Mongoose.Schema({
  days: Number,
  provider: String
});

export const NewShipping = Mongoose.model<INewShippingModel>(
  "New Shipping",
  NewShippingSchema
);

export const ShippingSchema = new Mongoose.Schema({
  days: Number,
  provider: String,
  price: Number,
  cancelled: Boolean
});

export const Shipping = Mongoose.model<IShippingModel>(
  "Shipping",
  ShippingSchema
);

export default Shipping;
