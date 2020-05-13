import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Store from "./Store.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import InternalService from "./internal/Internal.service";
import ExternalService from "./external/External.service";

@Injectable()
@InjectModel(Store)
export class StoreService extends Service<Store> {
  
  constructor(
    private readonly internal: InternalService,
    private readonly external: ExternalService,
  ) {
    super();
  }

}

export default StoreService;