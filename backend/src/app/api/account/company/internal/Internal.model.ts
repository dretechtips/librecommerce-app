import Company, { CompanySchema } from "../Company.model";
import { InternalDOT } from "./Internal.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";


export class InternalSchema extends CompanySchema implements InternalDOT {

}

export class Internal extends ExtendedModelFactory(Company, InternalSchema) {}

export default Internal;