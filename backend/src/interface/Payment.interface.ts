import CreditCard from '../type/CreditCard';
import Check from '../type/Check';
import { PaypalMe } from './Paypal.interface';
import Money from '../type/Money';

export type Method = CreditCard | Check | PaypalMe;

export interface Value extends Constructor {}

export interface Constructor {
  method: Method;
  online: boolean;
  cost: Money;
  breakdown: Breakdown[];
}

export interface Breakdown {
  name?: string;
  cost: Money;
}
