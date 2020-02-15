import { Typegoose, prop } from "typegoose";

export class DimensionSchema {
  constructor(length: number, width: number, height: number) {}
  @prop({ required: true })
  public length: number;
  @prop({ required: true })
  public width: number;
  @prop({ required: true })
  public height: number;
}

export default DimensionSchema;
