import ModelFactory from "src/app/common/model/Model.factory";
import AddressSchema from "src/app/common/model/schema/Address.schema";
import { arrayProp, prop } from "@typegoose/typegoose";
import CostSchema from "../../billing/cost/Cost.schema";
import { ShippingDOT, ShippingProvider } from "./Shipping.interface";
import { AlreadyShippedException } from "./Shipping.exception";

class ShippingSchema implements ShippingDOT {
  @prop({ required: true, enum: ShippingProvider })
  public provider: ShippingProvider;
  @prop({ required: true })
  public cancelled: boolean;
  @prop({ required: true })
  public days: number;
  @arrayProp({ required: true })
  public packageIDs: string[];
  @arrayProp({ required: true })
  public cost: CostSchema;
  @prop({ required: true })
  public shipFromID: string;
  @prop({ required: true })
  public shipToID: string;
  @prop({required: true, default: false})
  public hasShipped: boolean;

  public cancel(): void {
    this.cancelled = !this.hasShipped;
    if(!this.cancelled)
      throw new AlreadyShippedException();
  }
}

export class Shipping extends ModelFactory(ShippingSchema) {}

export default Shipping;
