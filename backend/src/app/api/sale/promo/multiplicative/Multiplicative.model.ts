import Promo, { PromoSchema } from "../Promo.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";

export class MultiplicativeSchema extends PromoSchema {
  public getTrueDiscount(price: number): number {
    return price * (this.discount / 100);
  }
}

export class Multiplicative extends ExtendedModelFactory(
  Promo,
  MultiplicativeSchema
) {}

export default Multiplicative;
