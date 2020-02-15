import { Typegoose, prop } from "typegoose";
import { WageDOT } from "./Wage.interface";
import ModelFactory from "src/app/common/model/Model.factory";

export class WageSchema extends Typegoose implements WageDOT {
  @prop({ required: true })
  hourlyRate: number;
}

export const Wage = ModelFactory(WageSchema);

export default Wage;
