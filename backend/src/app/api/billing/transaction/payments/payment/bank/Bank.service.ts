import { Injectable } from "@nestjs/common";
import Bank from "./Bank.model";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class BankService extends Service<typeof Bank> {
  constructor() {
    super(Bank);
  }
}

export default BankService;
