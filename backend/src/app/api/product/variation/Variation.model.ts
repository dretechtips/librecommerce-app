import Mongoose from "mongoose";
import { VariationDOT } from "./Variation.interface";
import Model, { ModelFactory } from "src/app/common/model/Model.factory";
import { Typegoose, prop, arrayProp } from "typegoose";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

class VariationSchema extends Typegoose implements VariationDOT {
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public productID: string;
  @prop({ required: true })
  public price: number;
  @arrayProp({ required: true })
  public images: string[];
  @prop({ required: true })
  public size: string;
  @prop({ required: true })
  public color: string;
  @prop({ required: true })
  public stock: number;
}

export const Variation = ModelFactory(VariationSchema);

export default Variation;
