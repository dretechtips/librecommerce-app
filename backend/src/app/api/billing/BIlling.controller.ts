import { Controller, Get, Query, Post, Param } from "@nestjs/common";
import { BillingService } from "./Billing.service";
import { ToDatePipe } from "src/app/common/pipe/Pipe.utility";
import { ValidateTransactionIDPipe } from "./transaction/Transaction.pipe";

export const prefix = "billing";

@Controller(prefix)
export class BillingController {
  constructor(private readonly billing: BillingService) {}
  @Get("list")
  public async list(
    @Query("start", ToDatePipe) start: Date,
    @Query("end", ToDatePipe) end: Date
  ) {
    return (await this.billing.findAllFromDates(start, end)).map(cur =>
      cur.toJSON()
    );
  }
  @Post("capture/:billingID")
  public async capture(
    @Param("billingID", ValidateTransactionIDPipe) transactionID: string
  ) {
    await this.billing.process(transactionID);
  }
}

export default BillingController;
