import { Injectable, Scope, Body } from "@nestjs/common";
import ProductVariation from "src/api/product/variation/Variation.model";
import { CartItemDOT, CartDOT } from "src/api/cart/Cart.interface";
import ServiceFactory from "src/common/factory/Service.factory";
import Cart from "./Cart.model";

@Injectable()
export class CartService extends ServiceFactory(Cart) {
  constructor() {
    super();
  }
}

export default CartService;
