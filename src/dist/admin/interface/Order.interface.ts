import { EmailAddress, PhoneNum } from "../model/Location";
import { Money } from "../model/Money";

export interface OrderConstructor
{
  id: string,
  timestamp: Date,
  productsID: string[],
  address: string,
  username?: string,
  email: EmailAddress,
  phone: PhoneNum,
  cancelled?: boolean,
}