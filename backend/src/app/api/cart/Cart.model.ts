import Mongoose from "mongoose";
import { CartDOT, CartItemDOT } from "./Cart.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, Typegoose } from "typegoose";
import { Transactable } from "../billing/transaction/Transaction.interface";

class CartSchema extends Typegoose implements CartDOT {
  @arrayProp({ required: true })
  public products: CartItemDOT[];
}

export class Cart extends ModelFactory(CartSchema) {}

export default Cart;
