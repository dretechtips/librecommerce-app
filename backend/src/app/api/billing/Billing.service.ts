import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Billing from "./Billing.model";
import TransactionService from "./transaction/Transaction.service";
import PaymentsService from "./transaction/payments/Payments.service";
import {
  Transactable,
  TransactionType
} from "./transaction/Transaction.interface";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
@InjectModel(Billing)
export class BillingService extends Service<Billing> {
  constructor(
    private readonly transaction: TransactionService,
    private readonly payments: PaymentsService
  ) {
    super();
  }
  
  public async unprocess(
    transactable: Transactable[],
    type: TransactionType
  ): Promise<string> {
    return await this.transaction.unpayed(transactable, type);
  }
  public async process(paymentID: string, transactionID: string) {
    const option = await this.payments.getMethod(paymentID);
    await this.transaction.capture(transactionID, option);
  }
  public async findAllFromDates(start: Date, end?: Date): Promise<Billing[]> {
    if (!end) return this.findAllFromDates(start, start);
    return this.findAllAtDateRange("date", start, end);
  }
}
