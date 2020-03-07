import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import ShippingService from "./Shipping.service";

@Injectable()
export class ShippingTask {
  constructor(private readonly shipping: ShippingService) {}
  /**
   * Checks server availability every 10 minutes in order to notify employees,
   * if the Shipping Provider servers / microservices are down in order to
   * enact alternative protocol
   */
  @Cron("10,20,30,40,50,60 * * * *")
  public check() {
    this.shipping.isAvailable();
  }
}
