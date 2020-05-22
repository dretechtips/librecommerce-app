import Store, { StoreSchema } from "../Store.model";
import { ExternalStoreDOT } from "./ExternalStore.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";

class ExternalStoreSchema extends StoreSchema implements ExternalStoreDOT {
  
}

export class ExternalStore extends ExtendedModelFactory(Store, ExternalStoreSchema) {}

export default ExternalStore;