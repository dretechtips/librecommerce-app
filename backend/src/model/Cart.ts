import Mongoose from "mongoose";
import { CartCompileType, CartItemCompileType } from "../interface/Cart.interface";
import Model from "../factory/Model";

const CartRuntimeType: Mongoose.TypedSchemaDefinition<CartCompileType> = {
  products: [{id: String, amount: Number }]
}

export const CartSchema = new Mongoose.Schama<CartCompileType>(CartRuntimeType);

class Cart extends Model("Cart", CartSchema) {
  public getProducts() {
    
  }
}

export default Cart;

