import { Typegoose, prop } from "typegoose";
import { SingleDOT } from "./Single.interface";
import ModelFactory from "src/app/common/model/Model.factory";

class SingleSchema extends Typegoose implements SingleDOT {
  @prop({ required: true })
  public date: Date;
  @prop({ required: true })
  public eventID: string;
}

export class Single extends ModelFactory(SingleSchema) {}

export default Single;
