import { PayrollDOT, PayrollType } from "./Payroll.interface";
import Mongoose from "mongoose";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";

class PayrollSchema extends Typegoose implements PayrollDOT {
  @prop({ required: true })
  userID: string;
  @prop({ required: true, enum: PayrollType })
  active: PayrollType;
  @prop()
  wageID?: string;
  @prop()
  salaryID?: string;
  @prop()
  commissionID?: string;
}

export const Payroll = ModelFactory(PayrollSchema);

export default Payroll;
