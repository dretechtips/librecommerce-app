import Service from "src/app/common/service/Service.factory";
import { InjectModel } from "src/app/common/model/Model.decorator";
import { Internal } from "./Internal.model";

@InjectModel(Internal)
export class InternalService extends Service<Internal> {

}

export default InternalService;