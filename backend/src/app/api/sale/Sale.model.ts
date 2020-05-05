import ModelFactory from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import { SaleDOT } from "./Sale.interface";

class SaleSchema implements SaleDOT {
  @prop({ required: true })
  orderID: string;
  @prop({ required: true })
  shippingID: string;
  @prop({ required: true })
  cartID: string;
  @prop({ required: true })
  transactionID: string;
  @prop({ required: true })
  accountID: string;
}

export class Sale extends ModelFactory(SaleSchema) {}

export default Sale;
