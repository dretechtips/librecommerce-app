import { Money } from "../type/Money"
import { DateRange } from "../type/Range";
import { BillingConstructor, TransactionConstructor } from "../interface/Billing.interface";
import { Request } from "express-serve-static-core";
import { IPAddress } from "../type/Location";
import { DatabaseQuery } from "./Database";
import { Order } from "./Order";
import { OrderConstructor } from "../interface/Order.interface";
import uuid = require("uuid/v4");

export class Billing
{
  private _value: BillingConstructor;
  constructor(dateRange: DateRange, req: Request)
  {
    this._value.ipAddress = new IPAddress(req.header('x-forward-for') || req.connection.remoteAddress);
    this._value.timestamp = new Date();
    this._value.dateRange = dateRange;
  }
  private findTransactionsOnDate(date: Date): Map<Date, Transaction>
  {
    let map = new Map<Date, Transaction>();
    
  }
  public findTransactionsOnRange(dateRange: DateRange)
  {
    let cur: Date = dateRange.getStartDate();
    while(cur !== dateRange.getEndDate())
    {
      let map: Map<Date, Transaction> = this.findTransactionsOnDate(cur);
      this._value.transactions.push(map);
      cur.setDate(cur.getDate() + 1);
    }
  }
}

export class Transaction
{
  private _value: TransactionConstructor;
  constructor(transaction: TransactionConstructor)
  {
    this._value = transaction;
  }
  public save()
  {
    
  }
  public delete()
  {

  }
  private deleteFromDatabase()
  {
    
  }
  public refund()
  {
    
  }
  public static From = class
  {
    public static id(id: string)
    {

    }
    public static order(order: Order): Transaction
    {
      const orderVal: OrderConstructor = order.getValue();
      const trans: TransactionConstructor = {
        shippingID: orderVal.shipping.getValue().shippingID,
        ipAddress: orderVal.ipAddress,
        orderID: orderVal.id,
        subtotal: orderVal.value,
        transactionID: uuid(),
        tax: orderVal.value.calcSalesTax(),
      }
      return new Transaction(trans);
    }
  }
}