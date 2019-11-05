import { Request, Response } from 'express';
import { Billing } from '../model/Billing';
import { DateRange } from '../type/Range';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import { Constructor, Body } from '../interface/Billing.interface';
import { ClientError } from '../type/Error';

export const search = HttpFunction(
  "System couldn't find the bill for the date range.",
  (req, res) => {
    if (!req.query.startDate || !req.query.endDate)
      throw new ClientError(
        "Client didn't specify a start date and end date to search."
      );
    const startDate: string = req.body.startDate;
    const endDate: string = req.body.endDate;
    const range: DateRange = new DateRange(
      new Date(startDate),
      new Date(endDate)
    );
    const billing: Billing = new Billing(range, req);
    const bill: Body = billing.toPrimObj();
    res.send({ success: true, billing: bill });
  }
);

export const searchToday = HttpFunction(
  "System couldn't find the bill for today.",
  (req, res) => {
    const billRange: DateRange = new DateRange(new Date(), new Date());
    const billing: Billing = new Billing(billRange, req);
    const bill: Body = billing.toPrimObj();
    res.send({ success: true, billing: bill });
  }
);
