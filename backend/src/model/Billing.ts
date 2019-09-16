import { Money } from "../type/Money"
import { DateRange } from "../type/Range";
import { BillingConstructor, TransactionConstructor, BillingDate, BillingBody, TransactionBody, BillingDateBody } from "../interface/Billing.interface";
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
  private findTransactionsOnDate(date: Date): BillingDate
  {
    const group: BillingDate = {
      date: date,
      transactions: Transaction.From.date(date)
    }
    return group;
  }
  public findTransactionsOnRange(): BillingDate[]
  {
    let cur: Date = this._value.dateRange.getStartDate();
    const bill: BillingDate[] = [];
    while(cur !== this._value.dateRange.getEndDate())
    {
      let map: BillingDate = this.findTransactionsOnDate(cur);
      bill.push(map);
      cur.setDate(cur.getDate() + 1);
    }
    return bill;
  }
  public getValue(): BillingConstructor
  {
    return this._value;
  }
  public toPrimObj(): BillingBody
  {
    const billing: BillingBody =
    {
      startDate: this._value.dateRange.getStartDate().toLocaleDateString(),
      endDate: this._value.dateRange.getEndDate().toLocaleDateString(),
      timestamp: this._value.timestamp.toLocaleDateString(),
      transactions: this.primitizeDate(),
    }
    return billing;
  }
  private primitizeDate(): BillingDateBody[]
  {
    return this._value.transactions.map(cur => {
      const body: BillingDateBody = {
        date: cur.date.toLocaleDateString(),
        transactions: cur.transactions.map(cur => cur.toPrimObj())
      }
      return body;
    }) as BillingDateBody[];
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
  public toPrimObj(): TransactionBody
  {
    const trans: TransactionBody =
    {
      ipAddress: this._value.ipAddress.toString(),
      orderID: this._value.orderID,
      shippingID: this._value.shippingID,
      transactionID: this._value.transactionID
    }
    return trans;
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
        transactionID: uuid()
      }
      return new Transaction(trans);
    }
    public static date(date: Date): Transaction[]
    {
      
    }
  }
}