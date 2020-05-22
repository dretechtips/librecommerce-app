import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import Service from "src/app/common/service/Service.factory";
import { prefix } from "./Cart.controller";
import { CartDOT } from "./Cart.interface";
import Cart from "./Cart.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import Product from "../product/Product.model";

@Injectable()
export class CartService extends Service<Cart> {

  constructor(
    @InjectModel(Cart) public readonly cart: Cart,
  ) {
    super();
  }
  /**
   * Creates a cart based off the products
   * @param products Products
   */
  public async create(products: Product[]): Promise<Cart> {
    const cartDOT: CartDOT = {
      productIDs: products.map(cur => cur._id)
    };
    return this.add(cartDOT);
  }

  
  public async quantity(
    cartID: string,
    productID: string,
    quantity: number
  ): Promise<void> {
    const cart = await this.get(cartID);
    const indexOf = cart.productIDs.indexOf(productID);
    if (indexOf === -1) throw new NotFoundException("Product ID not found.");
    cart.productIDs = cart.productIDs.filter(cur => cur !== productID);
    cart.productIDs.push(...new Array(quantity).map(cur => productID));
    await cart.save();
  }
  public clearCookie(res: Response) {
    res.cookie(prefix, undefined);
  }
}

export default CartService;
