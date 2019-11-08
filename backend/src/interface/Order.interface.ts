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
}

export interface Value extends Constructor {
  id: string;
  timestamp: Date;
  cancelled: boolean;
  complete: boolean;
  cost: Money;
  hold: boolean;
}

export interface ExistingBody {
  customerID: string;
  cartID: string;
  shippingID: string;
  id: string;
  timestamp: string;
  cancelled: boolean;
  cost: number;
  hold: boolean;
}

export type SearchQuery = Pick<
  ExistingBody,
  'customerID' | 'cancelled' | 'cartID' | 'hold' | 'shippingID' | 'timestamp'
>;
