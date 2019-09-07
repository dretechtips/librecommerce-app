import { Discount } from "../type/Discount";

export interface BaseCoupon
{
  name: string,
  id: string,
  startTime: Date,
  endTime: Date,
  productsID?: string[],
  categoriesID?: string[],
  all?: boolean,
  deal: Discount,
  active: boolean
}

export interface StoreCoupon extends BaseCoupon {   }

export interface IndividualCoupon extends BaseCoupon
{
  customerID: string,
}



