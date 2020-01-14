import Mongoose from "mongoose";
import { ShippingData } from "../interface/Shipping.interface";
import Model from "../factory/Model";

const apple: Mongoose.TypedSchemaDefinition<ShippingData> = {
  cancelled: String,
  days: Number
};
const ShippingSchema = new Mongoose.Schema<ShippingData>({
  days: Number,
  provider: String,
  price: Number,
  cancelled: Number
});

class Shipping extends Model("Shipping", ShippingSchema) {
  public cancel() {
    this.getModel().days;
  }
}
