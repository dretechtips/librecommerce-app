import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import External from "./External.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
@InjectModel(External)
export class ExternalService extends Service<External> {
  
  

}

export default ExternalService;