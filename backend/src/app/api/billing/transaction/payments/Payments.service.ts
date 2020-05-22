import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import BankService from "./payment/bank/Bank.service";
import CardService from "./payment/card/Card.service";
import Payments from "./Payments.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
class PaymentsService extends Service<Payments> {

  public constructor(
    @InjectModel(Payments) public readonly model: Payments,
    private readonly bank: BankService,
    private readonly card: CardService
  ) {
    super();
  }
  
}

export default PaymentsService;
