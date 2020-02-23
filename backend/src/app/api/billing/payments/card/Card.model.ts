import { ModelFactory } from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { CardDOT, CardProvider, CardType } from "./Card.interface";

class CardSchema extends Typegoose implements CardDOT {
  @prop({ required: true })
  public number: number;
  @prop({ required: true })
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

export class Card extends ModelFactory(CardSchema) {}

// private validateCCNumber() {
//   if (
//     this.data().number.toFixed().length < 13 ||
//     this.data().number.toFixed().length > 16
//   )
//     throw new Error(
//       "Credit Card should be no smaller than 13 characters or no larger than 16 characters"
//     );
//   if (!NumberUtil.ValidateCheckSum(this.data().number, 10))
//     throw new Error("Credit Card Number has an invalid check sum.");
// }
// private validateCVV() {
//   const cvv = this.data().cvv;
//   if (cvv.toFixed().length > 5 || cvv.toFixed().length < 3)
//     throw new Error("Credit Card Number has an invalid check sum.");
//   if (!NumberUtil.ValidateCheckSum(cvv, 10))
//     throw new Error("Credit Card CVV has an invalid check sum.");
// }

export default Card;
