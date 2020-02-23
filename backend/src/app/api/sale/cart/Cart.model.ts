import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, Typegoose } from "typegoose";
import { CartDOT } from "./Cart.interface";

class CartSchema extends Typegoose implements CartDOT {
  @arrayProp({ required: true })
  public productIDs: string[];
}

export class Cart extends ModelFactory(CartSchema) {}

export default Cart;
