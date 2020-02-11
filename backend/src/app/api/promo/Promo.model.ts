import Mongoose from "mongoose";
import { PromoDOT } from "./Promo.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";

class PromoSchema extends Typegoose implements PromoDOT {
  @prop({ required: true })
  discount: number;
  @prop({ required: true })
  start: string;
  @prop({ required: true })
  end: string;
}

export const Promo = ModelFactory(PromoSchema);

export default Promo;
