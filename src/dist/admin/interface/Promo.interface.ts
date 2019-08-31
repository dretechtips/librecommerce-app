import { Discount } from "../model/Coupon";
import { IntervalDate } from "../model/IntervalDate";
import { DateRange } from "../type/Range";

export interface BasePromo
{
  name: string;
  id: string;
  productsID?: string[];
  categoriesID?: string[];
  all?: boolean;
  code: string;
  deal: Discount;
  active: boolean;
}

export interface StandardPromo extends BasePromo
{
  dateRange: DateRange;
  discriminator: 'standard';
}

export interface IntervalPromo extends BasePromo
{
  interval: IntervalDate;
  discriminator: 'interval';
}

