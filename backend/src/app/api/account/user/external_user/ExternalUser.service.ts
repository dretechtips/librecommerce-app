import Service from "src/app/common/service/Service.factory";
import ExternalUser from "./ExternalUser.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";
import Mixin from "src/app/common/mixin/Mixin.decorator";

@Injectable()
export class ExternalUserService extends Service<ExternalUser> {
  
  constructor(
    @InjectModel(ExternalUser) public readonly model: ExternalUser
  ) {
    super();
  }

  

}

export default ExternalUserService;