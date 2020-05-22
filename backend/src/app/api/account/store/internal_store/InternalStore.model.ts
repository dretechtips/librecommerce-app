import Store, { StoreSchema } from "../Store.model";
import { StoreDOT } from "../Store.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { InternalStoreDOT } from "./InternalStore.interface";

export class InternalStoreSchema extends StoreSchema implements InternalStoreDOT {
  
}

export class InternalStore extends ExtendedModelFactory(Store, InternalStoreSchema) {}

export default InternalStore;