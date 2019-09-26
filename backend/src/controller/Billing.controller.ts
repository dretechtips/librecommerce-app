import { Request, Response } from "express";
import { Action } from "../interface/Dashboard.interface";
import { Billing } from "../model/Billing";
import { DateRange } from "../type/Range";
import { HttpMethod } from "../decorator/HttpMethod";

export class BillingController
{
  @HttpMethod("GET", "System couldn't find the bill.")
  public static search(req: Request, res: Response): void
  {
    if(!req.query.startDate || !req.query.endDate)
      throw new Error("No Date Range is specified to fetch billing!");
    const startDate: string = req.body.startDate;
    const endDate: string = req.body.endDate;
    const range: DateRange = new DateRange(new Date(startDate), new Date(endDate));
    const billing: Billing = new Billing(range, req);
    billing.toPrimObj();
    res.send({success: true, billing: ""});
  }
  @HttpMethod("GET", "System couldn't find the bill for today.")
  public static searchToday(req: Request, res: Response): void
  {
   
    try {
      const range: DateRange = new DateRange(new Date(), new Date());
      const billing: Billing = new Billing(range, req);
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: })
    }
  }
}