import { Discount } from "../type/Discount";
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
  dateRange: DateRange;
}

export interface StandardPromo extends BasePromo
{   }

export interface IntervalPromo extends BasePromo
{

  interval: IntervalDate;
}

