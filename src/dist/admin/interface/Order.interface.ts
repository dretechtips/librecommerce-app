import { EmailAddress, PhoneNum } from "../model/Location";
import { Money } from "../model/Money";
import { NewShippingBody } from "../interface/Shipping.interface";

export interface OrderConstructor
{
  id: string,
  timestamp: Date,
  productsID: string[],
  address: string,
  username?: string,
  email: EmailAddress,
  phone: PhoneNum,
  cancelled: boolean,
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