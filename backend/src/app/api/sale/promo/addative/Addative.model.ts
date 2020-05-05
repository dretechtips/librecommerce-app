import Promo, { PromoSchema } from "../Promo.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";

class AddativeSchema extends PromoSchema {
  public getTrueDiscount(price: number): number {
    return this.discount;
  }
}

export class Addative extends ExtendedModelFactory(Promo, AddativeSchema) {}

export default Addative;
