import { Controller, Post, Body, Req, Next } from "@nestjs/common";
import { Request } from "express";
import { CartDOT, CartItemDOT } from "../interface/Cart.interface";
import { CartValidationPipe, CartItemValidationPipe } from "src/pipe/Cart.pipe";
import { prefix as customerPrefix } from "./Customer.controller";
import Cart from "src/model/Cart";
import CartService from "src/service/Cart.service";

export const prefix = "cart";

@Controller(prefix)
export class CartController {
  constructor(private readonly cart: CartService) {}
  @Post("create")
  public create(@Body(prefix, CartValidationPipe) dot: CartDOT) {}
  @Post("add")
  public async add(@Body(prefix, CartItemValidationPipe) dot: CartItemDOT) {
    this.cart.add(dot);
  }
}

export default CartController;
