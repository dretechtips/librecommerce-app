import { Typegoose, prop } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";
import { BoxDOT } from "./Box.interface";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

class BoxSchema extends Typegoose implements BoxDOT {
  @prop({ required: true })
  dimensions: DimensionSchema;
  @prop({ required: true, default: 0, min: 0 })
  quantity: number;
}

export class Box extends ModelFactory(BoxSchema) {}

export default Box;
