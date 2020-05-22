import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import { CardDOT, CardProvider, CardType } from "./Card.interface";
import Payment, { PaymentSchema } from "../Payment.model";

class CardSchema extends PaymentSchema implements CardDOT {
  private static SetNumber(val: number): number {
    if (
      val.toString().length < 13 ||
      val.toString().length > 16
    )
      throw new Error(
        "Credit Card should be no smaller than 13 characters or no larger than 16 characters"
      );
    // TODO
    if (!NumberUtil.ValidateCheckSum(val, 10))
      throw new Error("Credit Card Number has an invalid check sum.");
    return val;
  }

  private static SetCVV(val: number): number {
    if (val.toString().length > 5 || val.toString().length < 3)
      throw new Error("Credit Card Number has an invalid check sum.");
    // TODO
    if (!NumberUtil.ValidateCheckSum(val, 10))
      throw new Error("Credit Card CVV has an invalid check sum.");
    return val;
  }

  @prop({ required: true, set: CardSchema.SetNumber })
  public number: number;
  @prop({ required: true, set: CardSchema.SetCVV })
  public cvv: number;
  @prop({ required: true, min: 0, max: 12 })
  public expMonth: number;
  @prop({ required: true, min: 2000, max: 3000 })
  public expYear: number;
  @prop({ required: true, enum: CardProvider })
  public provider: CardProvider;
  @prop({ required: true, enum: CardType })
  public type: CardType;
}

export class Card extends ExtendedModelFactory(Payment, CardSchema) {}

export default Card;
