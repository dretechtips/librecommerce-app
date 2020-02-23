import { arrayProp, Typegoose } from "typegoose";
import ModelFactory from "../../../common/model/Model.factory";
import { PaymentsDOT } from "./Payments.interface";

class PaymentsSchema extends Typegoose implements PaymentsDOT {
  @arrayProp({ required: true })
  bankIDs: string[];
  @arrayProp({ required: true })
  ccIDs: string[];
}

export class Payments extends ModelFactory(PaymentsSchema) {}

export default Payments;
