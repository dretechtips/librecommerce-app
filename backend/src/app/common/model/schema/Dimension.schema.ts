import { Typegoose, prop } from "typegoose";
import { SizeMeasurementUnit } from "src/util/measurement/Size";

export class DimensionSchema {
  constructor(length: number, width: number, height: number) {}
  @prop({ required: true })
  public length: number;
  @prop({ required: true })
  public width: number;
  @prop({ required: true })
  public height: number;
  @prop({ required: true, enum: SizeMeasurementUnit })
  public unit: SizeMeasurementUnit;
}

export default DimensionSchema;
