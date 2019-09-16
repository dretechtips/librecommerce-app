import { DateRange } from "../type/Range";
import { Transaction } from "../model/BIlling";
import { IPAddress, EmailAddress } from "../type/Location";
import { Money } from "../type/Money";

export interface BillingConstructor
{
  ipAddress: IPAddress,
  timestamp: Date,
  dateRange: DateRange,
  transactions: BillingDate[],
}

export interface TransactionConstructor
{
  ipAddress: IPAddress,
  orderID: string,
  shippingID: string,
  transactionID: string,
}

export interface BillingDate
{
  date: Date,
  transactions: Transaction[]
}

export interface BillingDateBody {
  date: string,
  transactions: TransactionBody[],
}

export interface BillingBody
{
  timestamp: string,
  startDate: string,
  endDate: string,
  transactions: BillingDateBody[],
}

export interface TransactionBody
{
  ipAddress: string,
  orderID: string,
  shippingID: string,
  transactionID: string,
}