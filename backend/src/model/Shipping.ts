import Mongoose from "mongoose";
import { NewShippingData, ShippingData } from "../interface/Shipping.interface";

export const NewShippingSchema = new Mongoose.Schema(NewShippingData);

export const NewShipping: Mongoose.Model<Mongoose.Document> = Mongoose.model(
  "New Shipping",
  NewShippingSchema
);

export const ShippingSchema = new Mongoose.Schema(ShippingData);

export const Shipping = Mongoose.model("Shipping", ShippingSchema);

export default Shipping;
