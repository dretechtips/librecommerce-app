import { Money } from "../type/Money";

export interface ShippingConstructor
{
  shippingID: string,
  orderID?: string,
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