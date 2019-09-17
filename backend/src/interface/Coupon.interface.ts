import { Discount } from "../type/Discount";
import { DateRange } from "../type/Range";

interface BaseCoupon
{
  name: string,
  id: string,
  dateRange: DateRange,
  productsID?: string[],
  categoriesID?: string[],
  all?: boolean,
  deal: Discount,
  active: boolean
}

export interface StoreCoupon extends BaseCoupon {
  type: "store"
}

export interface IndividualCoupon extends BaseCoupon
{
  type: "individual",
  customerID: string,
}

export type CouponConstructor = StoreCoupon | IndividualCoupon;

interface BaseCouponBody {
  name: string,
  startDate: string,
  endDate: string,
  productsID: string[],
  categoriesID: string[],
  all: boolean,
  deal: number,
  active: boolean
}

export interface StoreCouponBody extends BaseCouponBody {
  type: "store";
}

export interface IndividualCouponBody extends BaseCouponBody {
  type: "individual";
  customerID: string;
}

export type CouponBody = StoreCouponBody | IndividualCouponBody;



