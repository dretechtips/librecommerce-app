import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Internal from "./Internal.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
@InjectModel(Internal)
export class InternalService extends Service<Internal> {

}

export default InternalService;