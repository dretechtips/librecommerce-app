import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";

export class CostSchema extends Typegoose {
  constructor(name: string, value: number) {
    super();
    this.name = name;
    this.value = value;
  }
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public value: number;

  public refund(): this {
    this.name = "Refund To " + this.name;
    this.value = -this.value;
    return this;
  }
}

export default CostSchema;
