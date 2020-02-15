import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Recurring from "./Recurring.model";

@Injectable()
export class RecurringService extends Service<Recurring> {
  constructor() {
    super(Recurring);
  }
}

export default Recurring;
