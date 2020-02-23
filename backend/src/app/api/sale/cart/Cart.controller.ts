import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res
} from "@nestjs/common";
import { Response } from "express";
import CartService from "src/app/api/sale/cart/Cart.service";
import { ToArrayPipe, ToNumberPipe } from "src/app/common/pipe/Pipe.utility";
import { GetCartIDFromCookie } from "./Cart.decorator";
import { CartDOT } from "./Cart.interface";
import { ValidateCartIDPipe, ValidateCartPipe } from "./Cart.pipe";

export const prefix = "cart";

@Controller(prefix)
export class CartController {
  constructor(private readonly cart: CartService) {}
  @Post("create")
  public async create(@Body(prefix, ValidateCartPipe) dot: CartDOT) {
    return (await this.cart.add(dot))._id;
  }
  @Patch("add/:productIDs")
  public async add(
    @GetCartIDFromCookie() cartID: string,
    @Param("productIDs", ToArrayPipe) productIDs: string[]
  ): Promise<void> {
    const cart = await this.cart.get(cartID);
    cart.productIDs.push(...productIDs);
    await cart.save();
  }
  @Delete("remove/:productIDs")
  public async remove(
    @GetCartIDFromCookie() cartID: string,
    @Param("productIDs", ToArrayPipe) productIDs: string[]
  ): Promise<void> {
    await this.cart.removeFromArrayProp(cartID, "productIDs", productIDs);
  }
  @Patch("update/:productID/:quantity")
  public async handleQuantity(
    @GetCartIDFromCookie() cartID: string,
    @Param("productIDs") productID: string,
    @Param("quantity", ToNumberPipe) quantity: number
  ) {
    this.cart.quantity(cartID, productID, quantity);
  }
  @Get("fetch/:cartID")
  public async fetch(@Param("cartID", ValidateCartIDPipe) cartID: string) {
    return (await this.cart.get(cartID)).toJSON();
  }
  @Patch("clear")
  public clear(@Res() res: Response): void {
    this.cart.clearCookie(res);
  }
}

export default CartController;
