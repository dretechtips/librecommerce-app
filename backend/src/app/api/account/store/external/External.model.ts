import Store, { StoreSchema } from "../Store.model";
import { ExternalDOT } from "./External.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";

class ExternalSchema extends StoreSchema implements ExternalDOT {
  
}

export class External extends ExtendedModelFactory(Store, ExternalSchema) {}

export default External;