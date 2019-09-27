import { Money } from "../type/Money";

export interface ShippingConstructor
{
  shippingID: string,
  orderID: string,
  days: number,
  price: Money,
  provider: ShippingProvider,
  cancelled: boolean
}

export interface NewShippingBody
{
  days: number,
  price: number,
  provider: ShippingProvider,
  orderID: string,
}

export interface ExistingShippingBody extends NewShippingBody
{
  shippingID: string,
  orderID: string,
  cancelled: boolean,
}

export type ShippingProvider = "fedex" | "ups" | "usps";