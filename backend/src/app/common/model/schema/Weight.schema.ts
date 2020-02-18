import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { WeightMeasurementUnit } from "src/util/measurement/Weight";

export class WeightSchema {
  constructor(value: number, unit: WeightMeasurementUnit) {
    this.value = value;
    this.unit = unit;
  }
  @prop({ required: true, min: 0 })
  public value: number;
  @prop({ required: true, enum: WeightMeasurementUnit })
  public unit: WeightMeasurementUnit;
}

export default WeightSchema;
