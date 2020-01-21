import Mongoose from "mongoose";
import fs from "fs";
import {
  ShippingCompileType,
  ShippingProvider
} from "../interface/Shipping.interface";
import Model from "../factory/Model";
import { Transactable, SubCost } from "../interface/Transaction.interface";

const ShippingRuntimeType: Mongoose.TypedSchemaDefinition<ShippingCompileType> = {
  cancelled: Boolean,
  days: Number,
  provider: String
};

const ShippingSchema = new Mongoose.Schema<ShippingCompileType>(
  ShippingRuntimeType
);

class Shipping extends Model("Shipping", ShippingSchema)
  implements Transactable {
  constructor(data: any) {
    super(data);
    this.data().cancelled = false;
  }
  public cancel(): void {
    this.data().cancelled = false;
  }
  private async getFedexPrice(days: number): Promise<number> {
    // API Call To Fedex Server
    return -1;
  }
  private async getUSPSPrice(days: number): Promise<number> {
    // API Call to USPS Server
    return -1;
  }
  private async getUPSPrice(days: number): Promise<number> {
    // API Call to UPS Server
    return -1;
  }
  private generateCostName(name: ShippingProvider): string {
    if (name === "FEDEX" || name === "fedex")
      return "Fedex Shipping - " + this.data().days + " days";
    if (name === "UPS" || name === "ups")
      return "UPS Shipping - " + this.data().days + " days";
    if (name === "USPS" || name === "usps")
      return "USPS Shipping - " + this.data().days + " days";
    return "Shipping - " + this.data().days + " days";
  }
  public async getCharges(): Promise<SubCost[]> {
    switch (this.data().provider as ShippingProvider) {
      case "FEDEX" || "fedex":
        return [
          {
            name: this.generateCostName(
              this.data().provider as ShippingProvider
            ),
            cost: await this.getFedexPrice(this.data().days)
          }
        ];
        break;
      case "USPS" || "usps":
        return [
          {
            name: this.generateCostName(
              this.data().provider as ShippingProvider
            ),
            cost: await this.getUSPSPrice(this.data().days)
          }
        ];
        break;
      case "UPS" || "ups":
        return [
          {
            name: this.generateCostName(
              this.data().provider as ShippingProvider
            ),
            cost: await this.getUPSPrice(this.data().days)
          }
        ];
        break;
      default:
        return [];
    }
  }
}

export default Shipping;
