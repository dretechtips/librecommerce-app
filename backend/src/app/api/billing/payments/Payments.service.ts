import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import BankService from "./payment/bank/Bank.service";
import CardService from "./payment/card/Card.service";
import Payments from "./Payments.model";

@Injectable()
class PaymentsService extends Service<typeof Payments> {
  public constructor(
    private readonly bank: BankService,
    private readonly card: CardService
  ) {
    super(Payments);
  }
}

export default PaymentsService;
