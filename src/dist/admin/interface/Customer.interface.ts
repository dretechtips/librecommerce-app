import { Address, EmailAddress } from "../model/Location";

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
}

export default Customer;