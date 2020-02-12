import { Injectable, Scope, Body } from "@nestjs/common";
import ProductVariation from "src/app/api/product/variation/Variation.model";
import { CartItemDOT, CartDOT } from "src/app/api/cart/Cart.interface";
import Service from "src/app/common/service/Service.factory";
import Cart from "./Cart.model";

@Injectable()
export class CartService extends Service<Cart> {
  constructor() {
    super(Cart);
  }
}

export default CartService;
