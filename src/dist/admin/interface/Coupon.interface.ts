import { Discount } from "../model/Coupon";

export interface StoreCoupon
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

export interface IndividualCoupon 
{
  name: string,
  id: string,
  startTime: Date,
  endTime: Date,
  productsID?: string[],
  categoriesID?: string[],
  all?: boolean
  deal: Discount,
  customerID: string,
  active: boolean,
}



