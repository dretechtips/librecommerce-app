import { EmailAddress, PhoneNum, Address } from "../type/Location";
import { NewShippingBody, ExistingShippingBody } from "./Shipping.interface";
import { Shipping } from "../model/Shipping";
import { IPAddress } from "../type/Location";
import { Money } from "../type/Money";
import { AddressConstructor } from "./Location.interface";

export interface OrderConstructor
{
  id: string,
  timestamp: Date,
  products: OrderProduct[],
  address: Address,
  username?: string,
  email: EmailAddress,
  phone: PhoneNum,
  cancelled: boolean,
  shipping: Shipping,
  ipAddress: IPAddress,
  totalPay: Money
}

export interface NewOrderBody
{
  id: string,
  products: OrderProduct[],
  address: AddressConstructor,
  username?: string,
  email: string,
  phone: string,
  shipping: NewShippingBody
}

export interface ExistingOrderBody extends NewOrderBody
{
  address: AddressConstructor,
  timestamp: string,
  cancelled: boolean,
  ipAddress: string,
  totalPay: number,
  shipping: ExistingShippingBody
}

export interface OrderProduct
{
  id: string,
  quantity: number,
}