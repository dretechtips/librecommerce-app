import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Store from "./Store.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import InternalStoreService from "./internal_store/InternalStore.service";
import ExternalStoreService from "./external_store/ExternalStore.service";

@Injectable()
export class StoreService extends Service<Store> {
  
  constructor(
    @InjectModel(Store) public readonly model: Store,
    private readonly internal: InternalStoreService,
    private readonly external: ExternalStoreService,
  ) {
    super();
  }

}

export default StoreService;