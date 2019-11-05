import { DateRange } from '../type/Range';
import { Transaction } from '../model/Transaction';
import { IPAddress, EmailAddress } from '../type/Location';
import { Money } from '../type/Money';
import * as ITransaction from '../interface/Transaction.interface';

export interface Constructor {
  ipAddress: IPAddress;
  timestamp: Date;
  dateRange: DateRange;
}

export interface Body {
  timestamp: string;
  startDate: string;
  endDate: string;
  transactions: ITransaction.Body[];
}

export interface Value extends Constructor {
  transactions: Transaction[];
}
