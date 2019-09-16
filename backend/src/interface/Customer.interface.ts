import { Address, EmailAddress, PhoneNum } from "../type/Location";

export interface CustomerConstructor
{
  firstName: string,
  lastName: string,
  id: string,
  ordersID: string[],
  username: string,
  password: string,
  lastOrderDate?: Date,
  address: Address,
  email: EmailAddress,
  phone: PhoneNum,
}

export interface NewCustomerBody {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  address: string,
  email: string,
  phone: string,
}