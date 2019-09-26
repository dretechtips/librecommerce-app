import { Request, Response } from "express";
import { Action } from "../interface/Dashboard.interface";
import { Billing } from "../model/Billing";
import { DateRange } from "../type/Range";
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError } from "../model/Error";
import { BillingBody } from "../interface/Billing.interface";

export class BillingController
{
  @HttpMethod("GET", "System couldn't find the bill for the date range.")
  public static search(req: Request, res: Response): void
  {
    if(!req.query.startDate || !req.query.endDate)
      throw new ClientError("Client didn't specify a start date and end date to search.");
    const startDate: string = req.body.startDate;
    const endDate: string = req.body.endDate;
    const range: DateRange = new DateRange(new Date(startDate), new Date(endDate));
    const billing: Billing = new Billing(range, req);
    const bill: BillingBody = billing.toPrimObj();
    res.send({success: true, billing: bill});
  }
  @HttpMethod("GET", "System couldn't find the bill for today.")
  public static searchToday(req: Request, res: Response): void
  {
      const billRange: DateRange = new DateRange(new Date(), new Date());
      const billing: Billing = new Billing(billRange, req);
      const bill: BillingBody = billing.toPrimObj()
      res.send({success: true, billing: bill});
  }
}