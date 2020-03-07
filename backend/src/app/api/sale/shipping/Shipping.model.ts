import ModelFactory from "src/app/common/model/Model.factory";
import AddressSchema from "src/app/common/model/schema/Address.schema";
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
  @arrayProp({ required: true })
  public costs: CostSchema[];
  @prop({ required: true })
  public shipFrom: AddressSchema;
  @prop({ required: true })
  public shipTo: AddressSchema;
}

export class Shipping extends ModelFactory(ShippingSchema) {}

export default Shipping;
