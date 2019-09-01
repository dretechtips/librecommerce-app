import { Money } from "../model/Money";

export interface ShippingType
{
  days: number,
  price: Money,
  provider: "fedex" | "ups"
}