import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { SaleDOT } from "./Sale.interface";

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
