import Mongoose from "mongoose";
import { PromoCouponCompileType } from "../interface/Promo.interface";
import Promo, { PromoRuntimeType } from "./Promo";
import Model from "../factory/Model";

const PromoCouponRuntimeType: Mongoose.TypedSchemaDefinition<PromoCouponCompileType> = {
  ...PromoRuntimeType,
  code: String,
  customerID: String
};

const PromoCouponSchema = new Mongoose.Schema<PromoCouponCompileType>(
  PromoCouponRuntimeType
);

export class PromoCoupon extends Model("Promo Coupon", PromoCouponSchema, [
  Promo
]) {}

export default PromoCoupon;
