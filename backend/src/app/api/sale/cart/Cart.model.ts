import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp } from "@typegoose/typegoose";
import { CartDOT } from "./Cart.interface";

class CartSchema implements CartDOT {
  @arrayProp({ required: true })
  public productIDs: string[];

  public quantityOf(productID: string) {
    return this.productIDs.reduce((prev, cur) => prev += (cur == productID ? 1 : 0), 0);
  }
  
}

export class Cart extends ModelFactory(CartSchema) {}

export default Cart;
