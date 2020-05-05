import ModelFactory, { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import AccountSchema, { Account } from "../../Account.model";
import { StoreDOT, StoreType } from "./Store.interface";

class StoreSchema extends AccountSchema implements StoreDOT {
  @prop({ required: true, uppercase: true, maxlength: 5, minlength: 5 })
  public codeName: string;
  @prop({ required: true, enum: StoreType })
  public type: StoreType;
  @prop({ required: true })
  public account: AccountSchema;
}

export class Store extends ExtendedModelFactory(Account, StoreSchema) {}

export default Store;
