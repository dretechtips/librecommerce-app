import { SubscriptionDOT } from "./Subscription.interface";
import { Typegoose, prop, arrayProp } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class SubscriptionSchema extends Typegoose implements SubscriptionDOT {
  @prop({ required: true })
  public name: string;
  @arrayProp({ required: true })
  public productIDs: string[];
  @prop({ required: true, default: false })
  public active: boolean;
  @prop({ required: false, min: 0, max: 100 })
  public discount?: number;
}

export class Subscription extends ModelFactory(SubscriptionSchema) {}

export default Subscription;
