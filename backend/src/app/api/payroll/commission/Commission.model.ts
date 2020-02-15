import { Typegoose, prop } from "typegoose";
import { CommissionDOT } from "./Commission.interface";
import ModelFactory from "src/app/common/model/Model.factory";

class CommissionSchema extends Typegoose implements CommissionDOT {
  @prop({ required: true })
  percent: number;
}

export const Commission = ModelFactory(CommissionSchema);

export default Commission;
