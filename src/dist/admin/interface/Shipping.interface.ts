import { Money } from "../model/Money";

export interface ShippingConstructor
{
  orderID: string,
  days: number,
  price: Money,
  provider: "fedex" | "ups",
  cancelled: boolean
}

export interface NewShippingBody
{
  days: number,
  price: number,
  provider: "fedex" | "ups",
}