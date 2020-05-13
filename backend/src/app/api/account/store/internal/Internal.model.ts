import Store, { StoreSchema } from "../Store.model";
import { StoreDOT } from "../Store.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { InternalDOT } from "./Internal.interface";

export class InternalSchema extends StoreSchema implements InternalDOT {
  
}

export class Internal extends ExtendedModelFactory(Store, InternalSchema) {}

export default Internal;