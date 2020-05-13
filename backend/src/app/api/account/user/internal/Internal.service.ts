import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Internal from "./Internal.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import UserService from "../User.service";
import { LoginBasedService } from "../../util/login/Login.interface";
import Mixin from "src/app/common/mixin/Mixin.decorator";

export interface InternalService extends LoginBasedService<Internal> {}
@Injectable()
@InjectModel(Internal)
@Mixin(class extends LoginBasedService<Internal> {})
export class InternalService extends Service<Internal> {
  
  constructor() {
    super();
  }

}

export default InternalService;