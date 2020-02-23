import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, prop, Typegoose } from "typegoose";
import CostSchema from "../../billing/transaction/cost/Cost.schema";
import { ShippingDOT, ShippingProvider } from "./Shipping.interface";

class ShippingSchema extends Typegoose implements ShippingDOT {
  @prop({ required: true, enum: ShippingProvider })
  public provider: ShippingProvider;
  @prop({ required: true })
  public cancelled: boolean;
  @prop({ required: true })
  public days: number;
  @arrayProp({ required: true })
  public packageIDs: string[];
  @prop({ required: true })
  public cost: CostSchema;
}

export class Shipping extends ModelFactory(ShippingSchema) {}

export default Shipping;
