import Service from "src/app/common/service/Service.factory";
import External from "./External.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";
import Mixin from "src/app/common/mixin/Mixin.decorator";
import { LoginBasedService } from "../../util/login/Login.interface";

export interface ExternalService extends LoginBasedService<External> {}
@Injectable()
@InjectModel(External)
@Mixin(class extends LoginBasedService<External> {})
export class ExternalService extends Service<External> {
  
  

}

export default ExternalService;