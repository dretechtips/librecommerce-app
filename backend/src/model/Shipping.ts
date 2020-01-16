import Mongoose from "mongoose"
import { ShippingCompileType } from "../interface/Shipping.interface";
import Model from "../factory/Model";

const ShippingRuntimeType: Mongoose.TypedSchemaDefinition<ShippingCompileType> = {
  cancelled: Boolean,
  days: Number,
  price: Number,
  provider: String
};

const ShippingSchema = new Mongoose.Schema<ShippingCompileType>(
  ShippingRuntimeType
);

class Shipping extends Model("Shipping", ShippingSchema) {
  constructor(data: any) {
    super(data);
    this.setPrice();
  }
  public cancel(): void {
    this.data().cancelled = false;
  }
  public setPrice(): void {
    switch (this.data().provider) {
      case "FEDEX" || "fedex":
        this.data().price = this.getFedexPrice(this.data().days);
        break;
      case "USPS" || "usps":
        this.data().price = this.getUSPSPrice(this.data().days);
        break;
      case "UPS" || "ups":
        this.data().price = this.getUPSPrice(this.data().days);
        break;
      default:
        this.data().price = -1;
    }
  }
  private getFedexPrice(days: number): number {
    // API Call To Fedex Server
    return -1;
  }
  private getUSPSPrice(days: number): number {
    // API Call to USPS Server
    return -1;
  }
  private getUPSPrice(days: number): number {
    // API Call to UPS Server
    return -1;
  }
}

export default Shipping;
