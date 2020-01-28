import Mongoose from "mongoose";
import { SaleDOT } from "./Sale.interface";
import Model from "src/util/Model.factory";
import Cart from "src/module/cart/Cart.model";
import Shipping from "src/module/shipping/Shipping.model";
import Order from "src/module/order/Order.model";
import Transaction from "src/module/transaction/Transaction.model";
import { TransactionDOT } from "src/module/transaction/Transaction.interface";

const SaleRuntimeType: Mongoose.TypedSchemaDefinition<SaleDOT> = {
  cartID: String,
  shippingID: String,
  orderID: String,
  transactionID: String,
  customerID: String
};

const SaleSchema = new Mongoose.Schema<SaleDOT>(SaleRuntimeType);

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
