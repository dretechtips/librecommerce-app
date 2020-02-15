import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Bank from "./Bank.model";

@Injectable()
export class BankService extends Service<Bank> {
  constructor() {
    super(Bank);
  }
}

export default BankService;
