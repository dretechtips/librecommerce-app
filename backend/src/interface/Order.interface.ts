import { EmailAddress, PhoneNum, Address } from '../type/Location';
import * as IShipping from './Shipping.interface';
import { Shipping } from '../model/Shipping';
import { IPAddress } from '../type/Location';
import { Money } from '../type/Money';
import { AddressConstructor } from './Location.interface';
import * as ICustomer from './Customer.interface';
import ProductVariation from '../model/ProductVariation';
import Customer from '../model/Customer';
import Cart from '../model/Cart';

export interface Constructor {
  cart: Cart;
  customer: Customer;
  shipping: Shipping;
  ipAddress: IPAddress;
}

export interface Value extends Constructor {
  id: string;
  timestamp: Date;
  cancelled: boolean;
  complete: boolean;
  cost: Money;
}

export interface NewBody {
  customer: Customer;
  cart: Cart;
  shipping: Shipping;
  ipAddress: string;
}

export interface ExistingBody extends NewBody {
  id: string;
  timestamp: string;
  cancelled: boolean;
  ipAddress: string;
  totalCost: number;
}

export interface SearchQuery {
  customerID: string;
  shippingID: string;
  id: string;
  hold: boolean;
}
