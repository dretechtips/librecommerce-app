import { DateRange } from "../type/Range";
import { Transaction } from "../model/BIlling";
import { IPAddress, EmailAddress } from "../type/Location";
import { Money } from "../type/Money";

export interface BillingConstructor
{
  ipAddress: IPAddress,
  timestamp: Date,
  dateRange: DateRange,
  transactions: Map<Date, Transaction>[],
}

export interface TransactionConstructor
{
  ipAddress: IPAddress,
  orderID: string,
  shippingID: string,
  subtotal: Money,
  transactionID: string,
  tax: Money,
}