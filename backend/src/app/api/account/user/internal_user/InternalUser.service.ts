import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import InternalUser from "./InternalUser.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class InternalUserService extends Service<InternalUser> {
  
  constructor(
    @InjectModel(InternalUser) public readonly model: InternalUser
  ) {
    super();
  }

}

export default InternalUserService;