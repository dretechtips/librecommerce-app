import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import InternalStore from "./InternalStore.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class InternalStoreService extends Service<InternalStore> {

  constructor (
    @InjectModel(InternalStore) public readonly model: InternalStore
  ) {
    super();
  }

}

export default InternalService;