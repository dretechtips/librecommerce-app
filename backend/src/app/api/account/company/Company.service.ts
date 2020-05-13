import Service from "src/app/common/service/Service.factory";
import Company from "../company/Company.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";
import InternalService from "./internal/Internal.service";
import {  } from "./external/External.service";

@Injectable()
@InjectModel(Company)
export class CompanyService extends Service<Company> {
  
  constructor(
    private readonly internal: InternalService,
    private readonly external: ExternalService,
  ) {
    super();
  }

}

export default CompanyService