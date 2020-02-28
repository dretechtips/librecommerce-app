import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { UPSDOT } from "./UPS.interface";

class UPSSchema extends Typegoose implements UPSDOT {
  @prop({ required: true })
  public shippingID: string;
  @prop({ required: true })
  public vShippingID: string;
  @prop({ required: true })
  public tracking: string;
}

export class UPS extends ModelFactory(UPSSchema) {}

export default UPS;
