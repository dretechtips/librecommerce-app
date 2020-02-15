import { SalaryDOT } from "./Salary.interface";
import { Typegoose, prop, arrayProp } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class SalarySchema extends Typegoose implements SalaryDOT {
  @prop({ required: true, min: 300000, max: 1000000 })
  base: number;
  @arrayProp({ required: true })
  bonuses: number[];
}

export const Salary = ModelFactory(SalarySchema);

export default Salary;
