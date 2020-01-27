import { Injectable, Scope } from "@nestjs/common";
import ProductVariation from "src/model/ProductVariation";
import { CartItemDOT } from "src/interface/Cart.interface";

@Injectable({ scope: Scope.REQUEST })
export class CartService {
  private readonly items: CartItemDOT[] = [];
  public async add(item: CartItemDOT): Promise<void> {
    const product = await ProductVariation.getSelfByID(item.id);
    if (!product) throw new Error("Invalid Product ID");
    this.items.push(item);
  }
  public get(): CartItemDOT[] {
    return this.items;
  }
  public loadID();
}

export default CartService;
