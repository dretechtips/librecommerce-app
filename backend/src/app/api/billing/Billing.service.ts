import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Billing from "./Billing.model";
import TransactionService from "./transaction/Transaction.service";
import PaymentsService from "./payments/Payments.service";
import {
  Transactable,
  TransactionType
} from "./transaction/Transaction.interface";

@Injectable()
export class BillingService extends Service<typeof Billing> {
  constructor(
    private readonly transaction: TransactionService,
    private readonly payments: PaymentsService
  ) {
    super(Billing);
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
