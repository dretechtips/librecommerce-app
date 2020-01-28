import {
  Controller,
  Post,
  Body,
  Req,
  Next,
  Get,
  Patch,
  Res
} from "@nestjs/common";
import { Response } from "express";
import { CartDOT, CartItemDOT } from "./Cart.interface";
import { CartValidationPipe, CartItemValidationPipe } from "./Cart.pipe";
import { prefix as customerPrefix } from "src/module/account/customer/Customer.controller";
import Cart from "src/module/cart/Cart.model";
import CartService from "src/module/cart/Cart.service";

export const prefix = "cart";

@Controller(prefix)
export class CartController {
  constructor(private readonly cart: CartService) {}
  @Post("create")
  public create(@Body(prefix, CartValidationPipe) dot: CartDOT) {}
  @Post("add")
  public async add(@Body(prefix, CartItemValidationPipe) dot: CartItemDOT) {
    
  }
  @Patch("clear")
  public clear(@Res() res: Response) {
    res.cookie(prefix, "");
  }
}

export default CartController;
