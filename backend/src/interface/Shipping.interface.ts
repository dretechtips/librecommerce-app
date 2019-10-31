import { Money } from '../type/Money';

export interface Constructor {
  shippingID: string;
  orderID: string;
  days: number;
  price: Money;
  provider: Provider;
  cancelled: boolean;
}

export interface NewBody {
  days: number;
  price: number;
  provider: Provider;
  orderID: string;
}

export interface ExistingBody extends NewBody {
  shippingID: string;
  cancelled: boolean;
}

export type Provider = 'fedex' | 'ups' | 'usps';
