import { Injectable, Scope, Body } from "@nestjs/common";
import ProductVariation from "src/module/product/variation/Variation.model";
import { CartItemDOT, CartDOT } from "src/module/cart/Cart.interface";
import ServiceFactory from "src/util/Service.factory";
import Cart from "./Cart.model";

@Injectable()
export class CartService extends ServiceFactory<CartDOT>(Cart) {
  constructor() {
    super();
  }
}

export default CartService;
