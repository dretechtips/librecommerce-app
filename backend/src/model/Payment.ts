import Mongoose from "mongoose";
import { PaymentCompileType } from "../interface/Payment.interface";
import Model from "../factory/Model";

const PaymentRuntimeType: Mongoose.TypedSchemaDefinition<PaymentCompileType> = {
  creditCard: [],
  bank: [{
    account: Number,
    routing: Number
  }],
  paypalMe: [String]
};

const PaymentSchema = new Mongoose.Schema<PaymentCompileType>(PaymentRuntimeType);

export class Payment extends Model("Payment", )
