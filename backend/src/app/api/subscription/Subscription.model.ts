import { SubscriptionDOT } from "./Subscription.interface";
import { Typegoose, prop } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class SubscriptionSchema extends Typegoose implements SubscriptionDOT {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  productsID: string;
  @prop({ required: false })
  discount?: number;
}

export const Subscription = ModelFactory(SubscriptionSchema);

export default Subscription;
