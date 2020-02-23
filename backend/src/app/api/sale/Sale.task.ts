import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import SaleService from "./Sale.service";

@Injectable()
export class SaleTask {
  constructor(private readonly sale: SaleService) {}
  /**
   * @at Every 1st day of the Month at 6:30 AM
   */
  @Cron("0 30 6 1 * *", {
    name: "Charge Customer Active Subscription"
  })
  public ccas() {
    this.sale.repay();
  }
}

export default SaleTask;
