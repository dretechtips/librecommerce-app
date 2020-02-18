import Mongoose from "mongoose";
import { ShippingDOT, ShippingProvider } from "./Shipping.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import {
  Transactable,
  SubCost
} from "src/app/api/billing/transaction/Transaction.interface";
import { Typegoose, prop } from "typegoose";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import WeightSchema from "src/app/common/model/schema/Weight.schema";

class ShippingSchema extends Typegoose implements ShippingDOT {
  @prop({ required: true, enum: ShippingProvider })
  public provider: ShippingProvider;
  @prop({ required: true })
  public cancelled: boolean;
  @prop({ required: true })
  public days: number;
  @prop({ required: true })
  public boxID: string;
  @prop({ required: true })
  public weight: WeightSchema;
}

export class Shipping extends ModelFactory(ShippingSchema) {}

export default Shipping;
