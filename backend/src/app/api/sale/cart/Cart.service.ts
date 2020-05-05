import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import Service from "src/app/common/service/Service.factory";
import Variation from "../product/variation/Variation.model.txt";
import { VariationService } from "../product/variation/Variation.service.txt";
import { prefix } from "./Cart.controller";
import { CartDOT } from "./Cart.interface";
import Cart from "./Cart.model";

@Injectable()
export class CartService extends Service<typeof Cart> implements OnModuleInit {
  private product: VariationService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Cart);
  }
  public onModuleInit() {
    this.product = this.moduleRef.get(VariationService, { strict: false });
  }
  public async create(products: Variation[]): Promise<Cart> {
    const cartDOT: CartDOT = {
      productIDs: products.map(cur => cur._id)
    };
    return this.add(cartDOT);
  }
  public async validateDOT(dot: any): Promise<boolean> {
    try {
      await super.validateDOT(dot);
      const cartDOT: CartDOT = dot;
      await this.product.getAll(cartDOT.productIDs);
      return true;
    } catch (e) {
      return false;
    }
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
