import { Money } from '../type/Money';
import { NamespaceKey } from '../factory/Namespace.factory';

export interface Constructor {
  orderID: string;
  days: number;
  provider: Provider;
}

export interface Value extends Constructor {
  id: string;
  price: Money;
  cancelled: boolean;
}

export interface NewBody {
  days: number;
  price: number;
  provider: Provider;
  orderID: string;
}

export interface ExistingBody extends NewBody {
  id: string;
  cancelled: boolean;
}

export type Provider = 'fedex' | 'ups' | 'usps';

export interface SearchQuery {
  id: string;
  shippingID: string;
  orderID: string;
  provider: Provider;
}

export interface ParamStorage {
  id: NamespaceKey;
}
