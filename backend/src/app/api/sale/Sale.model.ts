import Mongoose from "mongoose";
import { SaleDOT } from "./Sale.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";
import Cart from "src/app/api/cart/Cart.model";
import Shipping from "src/app/api/shipping/Shipping.model";
import Order from "src/app/api/order/Order.model";
import Transaction from "src/app/api/billing/transaction/Transaction.model";
import { TransactionDOT } from "src/app/api/billing/transaction/Transaction.interface";

class SaleSchema extends Typegoose implements SaleDOT {
  @prop({ required: true })
  orderID: string;
  @prop({ required: true })
  shippingID: string;
  @prop({ required: true })
  cartID: string;
  @prop({ required: true })
  transactionID: string;
  @prop({ required: true })
  customerID: string;
}

export class Sale extends ModelFactory(SaleSchema) {}

export default Sale;
