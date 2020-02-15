import Mongoose from "mongoose";
import { ShippingDOT, ShippingProvider } from "./Shipping.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import {
  Transactable,
  SubCost
} from "src/app/api/billing/transaction/Transaction.interface";
import { Typegoose, prop } from "typegoose";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

class ShippingSchema extends Typegoose implements ShippingDOT {
  @prop({ required: true, enum: ShippingProvider })
  provider: ShippingProvider;
  @prop({ required: true })
  cancelled: boolean;
  @prop({ required: true })
  days: number;
  @prop({ required: true })
  public dimension: DimensionSchema;
  @prop({ required: true })
  public weight: number;
}

export class Shipping extends ModelFactory(ShippingSchema) {}

export default Shipping;
