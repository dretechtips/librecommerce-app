import Mongoose from "mongoose";
import { CartCompileType } from "../interface/Cart.interface";
import Model from "../factory/Model";

const CartRuntimeType: Mongoose.TypedSchemaDefinition<CartCompileType> = {
  products: [
    {
      id: String,
      amount: Number
    }
  ]
};
export const CartSchema = new Mongoose.Schema<CartCompileType>(CartRuntimeType);

class Cart extends Model("Cart", CartSchema) {
  public getProducts() {
    const productIDs = this.data().products.map(product => product.id);
    // Call Upon the Products
  }
}

export default Cart;
