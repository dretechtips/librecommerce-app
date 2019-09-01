import { Address, EmailAddress, PhoneNum } from "../model/Location";

interface Customer
{
  firstName: string,
  lastName: string,
  id: string,
  orders: string[],
  username: string,
  password: string,
  lastOrderDate: Date,
  address: Address,
  email: EmailAddress,
  phone: PhoneNum,
}

export default Customer;