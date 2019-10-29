import { Discount } from '../type/Discount';
import { DateRange } from '../type/Range';
import { Week } from '../type/Week';
import Product from '../model/Product';

export interface Constructor {
  discount: Discount;
  range: DateRange;
  productID: string;
}

export interface Value extends Constructor {
  timestamp: Date;
}
