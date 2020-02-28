import { Injectable } from "@nestjs/common";
import Service from "../../../account/type/customer/node_modules/src/app/common/service/Service.factory";
import Bank from "./Bank.model";

@Injectable()
export class BankService extends Service<Bank> {
  constructor() {
    super(Bank);
  }
}

export default BankService;
