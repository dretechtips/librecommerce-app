import { Injectable } from "@nestjs/common";
import Payments from "./Payments.model";
import PayflowService from "src/app/vendor/paypal/payflow/Payflow.service";
import { PayflowCorePayment } from "src/app/vendor/paypal/payflow/Payflow.interface";
import Service from "src/app/common/service/Service.factory";
import { PaymentOption } from "./Payments.interface";
import BankService from "./bank/Bank.service";
import CardService from "./card/Card.service";

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
