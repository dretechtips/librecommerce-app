import Mongoose from "mongoose";
import { CartDOT, CartItemDOT } from "./Cart.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, Typegoose } from "typegoose";

class CardSchema extends Typegoose implements CartDOT {
  @arrayProp({ required: true })
  products: CartItemDOT[];
}

export const Card = ModelFactory(CardSchema);

export default Cart;
