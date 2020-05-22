import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import ExternalCompany from "./ExternalCompany.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class ExternalCompanyService extends Service<ExternalCompany> {
  constructor(@InjectModel(ExternalCompany) public readonly model: ExternalCompany) {
    super();
  }
}

export default ExternalCompanyService;