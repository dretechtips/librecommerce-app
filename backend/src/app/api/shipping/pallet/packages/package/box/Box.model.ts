import { Typegoose, prop } from "typegoose";
import { BoxDOT } from "./Box.interface";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import Money from "src/app/common/model/type/Money.type";
import Int from "src/app/common/model/type/Int.type";
import ModelFactory from "src/app/common/model/Model.factory";

class BoxSchema extends Typegoose implements BoxDOT {
  @prop({ required: true, get: Int.get, set: Int.set })
  public quantity: number;
  @prop({ required: true })
  public dimensions: DimensionSchema;
}

export class Box extends ModelFactory(BoxSchema) {}

export default Box;
