import { arrayProp, prop } from "@typegoose/typegoose";
import ModelFactory from "../../../common/model/Model.factory";
import { PaymentsDOT } from "./Payments.interface";

class PaymentsSchema implements PaymentsDOT {
  @arrayProp({ required: true })
  public bankIDs: string[];
  @arrayProp({ required: true })
  public ccIDs: string[];
  @prop({required: true, default: 0})
  public dIndex: number;
  
  public getPaymentID(index?: number): string {
    const a = [...this.bankIDs, ...this.ccIDs];
    return index ? a[index] : a[this.dIndex];
  }
}

export class Payments extends ModelFactory(PaymentsSchema) {}

export default Payments;
