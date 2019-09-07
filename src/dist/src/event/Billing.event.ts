import * as events from "events";
import { BillingController } from "../controller/Billing.controller";
import * as cron from "node-cron";

const handler: events.EventEmitter = new events.EventEmitter();

export class BillingEvent
{
  public static emailDaysInfo()
  {
    // nodemmail in controller

  }
}

cron.schedule("0 24 * * *", () =>
{
  BillingEvent.emailDaysInfo();
})


