import { Controller } from "./Controller";
import { Request, Response } from "express-serve-static-core";
import { Action } from "../interface/Dashboard.interface";
import { Billing } from "../model/Billing";
import { DateRange } from "../type/Range";
import hconsole from "../model/Console";

export class BillingController extends Controller
{
  public static search(req: Request, res: Response): void
  {
    try {
      if(!req.query.startDate || !req.query.endDate)
        throw new Error("No Date Range is specified to fetch billing!");
      const startDate: string = req.body.startDate;
      const endDate: string = req.body.endDate;
      const range: DateRange = new DateRange(new Date(startDate), new Date(endDate));
      const billing: Billing = new Billing(range, req);
      billing.toPrimObj();
      res.send({success: true, billing: ""});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: ex.message });
    }
  }
  public static searchToday(req: Request, res: Response): void
  {
   
    try {
      const range: DateRange = new DateRange(new Date(), new Date());
      const billing: Billing = new Billing(range, req);
      c
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: })
    }
  }
}