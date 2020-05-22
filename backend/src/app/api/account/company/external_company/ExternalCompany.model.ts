import Company, { CompanySchema } from "../Company.model";
import { ExternalCompanyDOT } from "./ExternalCompany.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";

export class ExternalCompanySchema extends CompanySchema implements ExternalCompanyDOT {

}

export class ExternalCompany extends ExtendedModelFactory(ExternalCompanySchema, Company) {}

export default ExternalCompany;

