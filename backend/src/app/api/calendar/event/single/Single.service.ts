import { Injectable } from "@nestjs/common";
import Single from "./Single.model";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class SingleService extends Service<Single> {
  constructor() {
    super(Single);
  }
}

export default SingleService;
