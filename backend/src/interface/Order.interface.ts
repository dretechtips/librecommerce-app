import { EmailAddress, PhoneNum, Address } from "../type/Location";
import { NewShippingBody } from "./Shipping.interface";
import { Shipping } from "../model/Shipping";
import { IPAddress } from "../type/Location";
import { Money } from "../type/Money";

export interface OrderConstructor
{
  id: string,
  timestamp: Date,
  productsID: string[],
  address: Address,
  username?: string,
  email: EmailAddress,
  phone: PhoneNum,
  cancelled: boolean,
  shipping: Shipping,
  ipAddress: IPAddress,
  value: Money
}

export interface NewOrderBody
{
  id: string,
  productsID: string[],
  address: string,
  username?: string,
  email: string,
  phone: string,
  shipping: NewShippingBody
}