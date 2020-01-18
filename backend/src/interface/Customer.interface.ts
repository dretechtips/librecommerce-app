import { Address, EmailAddress, PhoneNum, IPAddress } from "../type/Location";
import { AccountCompileType } from "./Account.interface";

export interface CustomerCompileType extends AccountCompileType {
  orderIDs: string[];
  lastOrderDate: string;
}
