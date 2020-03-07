import ModelFactory from "src/app/common/model/Model.factory";
import ContactSchema from "src/app/common/model/schema/Contact.schema";
import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { StoreDOT, StoreType } from "./Store.interface";

class StoreSchema extends Typegoose implements StoreDOT {
  @prop({ required: true, uppercase: true, maxlength: 5, minlength: 5 })
  public codeName: string;
  @prop({ required: true, enum: StoreType })
  public type: StoreType;
  @prop({ required: true })
  public contact: ContactSchema;
}

export class Store extends ModelFactory(StoreSchema) {}

export default Store;
