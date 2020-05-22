import Service from "src/app/common/service/Service.factory";
import { InjectModel } from "src/app/common/model/Model.decorator";
import InternalCompany from "./InternalCompany.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InternalCompanyService extends Service<InternalCompany> {

  constructor(
    @InjectModel(InternalCompany) public readonly model: InternalCompany
  ) {
    super();
  }
  
}

export default InternalCompanyService;