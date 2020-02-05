import Mongoose from "mongoose";
import { CouponDOT } from "./Coupon.interface";
import Model from "src/common/factory/Model.factory";

const PromoCouponRuntimeType: Mongoose.TypedSchemaDefinition<CouponDOT> = {
  promoID: String,
  code: String,
  customerID: String
};

const PromoCouponSchema = new Mongoose.Schema<CouponDOT>(
  PromoCouponRuntimeType
);

export class PromoCoupon extends Model("Promo Coupon", PromoCouponSchema, [
  Promo
]) {}

export default PromoCoupon;
