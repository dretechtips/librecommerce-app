import { EmailAddress, PhoneNum, Address } from '../type/Location';
import * as IShipping from './Shipping.interface';
import { Shipping } from '../model/Shipping';
import { IPAddress } from '../type/Location';
import { Money } from '../type/Money';
import { AddressConstructor } from './Location.interface';
import * as ICustomer from './Customer.interface';
import ProductVariation from '../model/ProductVariation';

export interface Constructor {
  products: ProductVariation[];
  address: Address;
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
  customerID: string;
  // TODO: FIX CART
  cart: string;
  shipping: IShipping.NewBody;
}

export interface ExistingBody extends NewBody {
  id: string;
  customer: ICustomer.ExistingBody;
  timestamp: string;
  cancelled: boolean;
  ipAddress: string;
  totalCost: number;
  shipping: IShipping.ExistingBody;
}

export interface SearchQuery {
  customerID: string;
  shippingID: string;
  id: string;
  hold: boolean;
}
