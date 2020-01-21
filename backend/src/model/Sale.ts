import Mongoose from "mongoose";
import { SaleCompileType } from "../interface/Sale.interface";
import Model from "../factory/Model";
import Cart from "../model/Cart";
import Shipping from "../model/Shipping";
import Order from "../model/Order";
import Transaction from "../model/Transaction";
import { TransactionCompileType } from "../interface/Transaction.interface";

const SaleRuntimeType: Mongoose.TypedSchemaDefinition<SaleCompileType> = {
  cartID: String,
  shippingID: String,
  orderID: String,
  transactionID: String,
  customerID: String
};

const SaleSchema = new Mongoose.Schema<SaleCompileType>(SaleRuntimeType);

export class Sale extends Model("Sale", SaleSchema) {
  public async getCart(): Promise<Cart | null> {
    return Cart.getSelfByID(this.data().cartID) as Promise<Cart | null>;
  }
  public async getShipping(): Promise<Shipping | null> {
    return Shipping.getSelfByID(
      this.data().shippingID
    ) as Promise<Shipping | null>;
  }
  public async getOrder(): Promise<Order | null> {
    return Order.getSelfByID(this.data().orderID) as Promise<Order | null>;
  }
  public async getTransaction(): Promise<Transaction | null> {
    return Transaction.getSelfByID(
      this.data().transactionID
    ) as Promise<Transaction | null>;
  }
}
