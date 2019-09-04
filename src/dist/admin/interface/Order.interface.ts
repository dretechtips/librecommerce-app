import { EmailAddress, PhoneNum, Address } from "../model/Location";
import { Money } from "../model/Money";
import { NewShippingBody } from "../interface/Shipping.interface";
import { Shipping } from "../model/Shipping";

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