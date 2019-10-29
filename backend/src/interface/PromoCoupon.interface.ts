import { Discount } from '../type/Discount';
import { DateRange } from '../type/Range';
import Promo from '../model/Promo';
import Product from '../model/Product';

export interface Constructor {
  promos: Product[] | Promo[];
  name: string;
  range: DateRange;
}

export interface Value extends Omit<Constructor, 'promos'> {
  timestamp: Date;
  promos: Promo[];
  id: string;
}

export interface NewBody {
  productsID: string[];
  name: string;
  startDate: string;
  endDate: string;
  discount: number;
}

export interface ExistingBody {
  id: string;
}

export interface SearchQuery {
  productsID: string[];
  range: DateRange;
  discount: Discount;
  id: string;
}
