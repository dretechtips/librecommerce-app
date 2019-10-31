import { Address, EmailAddress, PhoneNum, IPAddress } from '../type/Location';
import * as IAccount from './Account.interface';

export interface Constructor extends IAccount.Constructor {
  ordersID: string[];
  lastOrderDate?: Date;
}

export interface Value extends Constructor {
  subscriptionsID: string[];
}

export interface NewBody extends IAccount.NewBody {}

export interface ExistingBody extends IAccount.ExistingBody {}

export interface SearchQuery extends IAccount.SearchQuery {}
