import { Money } from "../type/Money"
import { DateRange } from "../type/Range";
import { Value, Body } from "../interface/Billing.interface";
import { Request } from "express-serve-static-core";
import { IPAddress } from "../type/Location";
import { DatabaseQuery } from "./Database";
import { Order } from "./Order";
import uuid = require("uuid/v4");
import Transaction from "./Transaction";
import { Constructor } from "../interface/Billing.interface";
import { Time } from "../type/Time";
import { ServerError } from "../type/Error";

export class Billing
{
  private _value: Value;
  constructor(dateRange: DateRange, req: Request)
  {
    this._value.ipAddress = new IPAddress(req.header('x-forward-for') || req.connection.remoteAddress || req.ip);
    this._value.timestamp = new Date();
    this._value.dateRange = dateRange;
    this._value.transactions = [];
    this.transactions();
  }
  private transactions(): Transaction[] | null
  {
    try {
      const range: DateRange = this._value.dateRange;
      let cur: Date = range.getStartDate();
      let final: Date = range.getEndDate();
      const time: Time = new Time(1, "d");
      time.toMilliSeconds();
      const length: number = (range.getEndDate().getMilliseconds() - cur.getMilliseconds()) / time.getAmount();
      let counter: number = 0;
      this._value.transactions = new Array<Transaction>(length);
      while (cur !== final) {
        const trans: Transaction | null = Transaction.from.date(cur);
        if (!trans) throw new ServerError("System was unable to find the transaction for date " + cur + " is missing")
        this._value.transactions[counter] = trans;
        cur.setDate(cur.getDate() + 1);
      }
      return this._value.transactions;
    }
    catch (e) {
      return null;
    }
  }
  public orders(): Order[] | null {
    const trans: Transaction[] = this._value.transactions;
    const orders: (Order | null)[] = trans.map(cur => Order.from.id(cur.orderID()));
    orders.forEach((cur, index) => {
      try {
        if (!cur) throw new ServerError(trans[index].toString() + " has an invalid order ID");
      }
      catch (e) {
        const ex: Error = e;
        hconsole.error(ex);
      }
    });
    return orders.indexOf(null) > -1
      ? null
      : orders as Order[];
  }
  public getValue(): Value
  {
    return this._value;
  }
  public toPrimObj(): Body
  {
    const range: DateRange = this._value.dateRange;
    const billing: Body =
    {
      startDate: range.getStartDate().toLocaleDateString(),
      endDate: range.getEndDate().toLocaleDateString(),
      timestamp: this._value.timestamp.toLocaleDateString(),
      transactions: this._value.transactions.map(cur => cur.toPrimObj()),
    }
    return billing;
  }
}

