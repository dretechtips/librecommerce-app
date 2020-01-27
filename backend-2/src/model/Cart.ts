import Mongoose from "mongoose";
import { CartDOT } from "../interface/Cart.interface";
import Model from "./Model";
import ProductVariation from "./ProductVariation";
import { Transactable, SubCost } from "../interface/Transaction.interface";

const CartRuntimeType: Mongoose.TypedSchemaDefinition<CartDOT> = {
  products: [
    {
      id: String,
      amount: Number
    }
  ]
};
export const CartSchema = new Mongoose.Schema<CartDOT>(CartRuntimeType);

class Cart extends Model("Cart", CartSchema) implements Transactable {
  public async getProducts() {
    const productIDs = this.data().products.map(product => product.id);
    const product = await ProductVariation.getSelvesByIDs(productIDs);
    return product as ProductVariation[] | null;
  }
  public async getCharges(): Promise<SubCost[]> {
    const products = await this.getProducts();
    if (products) {
      const subcosts: SubCost[] = products.map(cur => {
        const subcost: SubCost = {
          name: cur.data().name,
          cost: cur.data().price
        };
        return subcost;
      });
      return subcosts;
    }
    return [];
  }
}

export default Cart;
