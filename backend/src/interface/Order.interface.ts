import { EmailAddress, PhoneNum, Address } from '../type/Location';
import { IShipping } from './Shipping.interface';
import { Shipping } from '../model/Shipping';
import { IPAddress } from '../type/Location';
import { Money } from '../type/Money';
import { AddressConstructor } from './Location.interface';
import * as ICustomer from './Customer.interface';

export interface Constructor {
  id: string;
  timestamp: Date;
  products: OrderProduct[];
  address: Address;
  cancelled: boolean;
  shipping: Shipping;
  ipAddress: IPAddress;
  cost: Money;
  complete: boolean;
}

export interface Value extends Constructor {}

export interface NewBody {
  customerID: string;
  id: string;
  products: OrderProduct[];
  shipping: IShipping.NewBody;
}

export interface ExistingBody extends NewBody {
  customer: ICustomer.ExistingBody;
  timestamp: string;
  cancelled: boolean;
  ipAddress: string;
  totalCost: number;
  shipping: IShipping.ExistingBody;
}

export interface OrderProduct {
  id: string;
  quantity: number;
}

export interface SearchQuery {
  customerID: string;
  shippingID: string;
  id: string;
}
