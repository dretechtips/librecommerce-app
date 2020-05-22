import Company, { CompanySchema } from "../Company.model";
import { InternalCompanyDOT } from "./InternalCompany.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";


export class InternalCompanySchema extends CompanySchema implements InternalCompanyDOT {

}

export class InternalCompany extends ExtendedModelFactory(Company, InternalCompanySchema) {}

export default InternalCompany;