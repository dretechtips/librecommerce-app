import { EmailAddress, PhoneNum } from "../model/Location";

export interface OrderConstructor
{
  id: string,
  timestamp: Date,
  products: string[],
  address: string,
  username?: string,
  email: EmailAddress,
  phone: PhoneNum,
  shippingType: string
}