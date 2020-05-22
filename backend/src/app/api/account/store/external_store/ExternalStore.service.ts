import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import ExternalStore from "./ExternalStore.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class ExternalStoreService extends Service<ExternalStore> {
  
  constructor(
    @InjectModel(ExternalStore) public readonly model: ExternalStore
  ) {
    super();
  }

}

export default ExternalStoreService;