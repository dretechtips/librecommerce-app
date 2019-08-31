import { Discount } from "../model/Coupon";
import { IntervalDate } from "../model/IntervalDate";

export interface StandardPromo
{
  name: string,
  id: string,
  startDate: Date,
  endDate: Date,
  productsID?: string[],
  categoriesID?: string[],
  all?: boolean,
  code: string,
  deal: Discount,
  active: boolean,
  discriminator: 'standard'
}

export interface IntervalPromo
{
  name: string,
  id: string,
  interval: IntervalDate,
  productsID?: string[],
  categoriesID?: string[],
  all?: boolean,
  code: string,
  deal: Discount,
  active: boolean,
  discriminator: 'interval'
}

