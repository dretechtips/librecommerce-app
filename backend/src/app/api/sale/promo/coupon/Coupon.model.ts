import Mongoose from "mongoose";
import { CouponDOT } from "./Coupon.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";

class CouponSchema extends Typegoose implements CouponDOT {
  @prop({ required: true })
  promoID: string;
  @prop({ required: true })
  customerID: string;
  @prop({ required: true })
  code: string;
}

export const Coupon = ModelFactory(CouponSchema);

export default PromoCoupon;
