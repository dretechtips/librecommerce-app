import { prop } from "@typegoose/typegoose";

export class CostSchema {
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public value: number;
}

export default CostSchema;
