import { Discount } from "../type/Discount";
import { DateRange } from "../type/Range";
import { Week } from "../type/Week";
import Product from "../model/Product";

export interface PromoCompileType {
  discount: number;
  start: string;
  end: string;
}

export interface PromoCouponCompileType extends PromoCompileType {
  customerID: string;
  code: string;
}

export interface PromoCodeCompileType extends PromoCompileType {
  code: string;
}
