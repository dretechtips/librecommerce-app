import * as Mongoose from "mongoose";

export interface ShippingCompileType {
  days: number;
  provider: string;
  price: number;
  cancelled: boolean;
}
