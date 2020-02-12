import { Injectable } from "@nestjs/common";
import { AppealDOT } from "./Appeal.interface";
import Appeal from "./Appeal.model";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class AppealService extends Service<Appeal> {
  constructor() {
    super(Appeal);
  }
}

export default AppealService;
