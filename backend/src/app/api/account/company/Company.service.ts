import Service from "src/app/common/service/Service.factory";
import Company from "../company/Company.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";
import InternalService from "./internal_company/InternalCompany.service";
import ExternalService from "./external_company/ExternalCompany.service";

@Injectable()
export class CompanyService extends Service<Company> {
  
  constructor(
    @InjectModel(Company) public readonly model: Company,
    private readonly internal: InternalService,
    private readonly external: ExternalService,
  ) {
    super();
  }


  
}

export default CompanyService