import Mongoose from "mongoose";
import { PaymentsDOT } from "./Payments.interface";
import ModelFactory from "../../../common/model/Model.factory";
import { PaymentOption } from "./Payments.interface";
import { Typegoose, arrayProp } from "typegoose";

class PaymentsSchema extends Typegoose implements PaymentsDOT {
  @arrayProp({ required: true })
  bankIDs: string[];
  @arrayProp({ required: true })
  ccIDs: string[];
}

export class Payments extends ModelFactory(PaymentsSchema) {}

export default Payments;
