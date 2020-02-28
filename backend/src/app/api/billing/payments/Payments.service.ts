import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import BankService from "./bank/Bank.service";
import CardService from "./card/Card.service";
import { PaymentOption } from "./Payments.interface";
import Payments from "./Payments.model";

@Injectable()
class PaymentsService extends Service<typeof Payments> {
  public constructor(
    private readonly bank: BankService,
    private readonly card: CardService
  ) {
    super(Payments);
  }
  public getMethod(methodID: string): PaymentOption {}
}

export default PaymentsService;
