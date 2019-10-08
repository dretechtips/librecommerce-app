import { Address, EmailAddress, PhoneNum, IPAddress } from "../type/Location";
import { IAccount } from "./Account.interface";

export namespace ICustomer {
  export interface Constructor extends IAccount.Constructor {
    ordersID: string[];
    lastOrderDate?: Date;
  }
  export interface Value extends Constructor {
    subscriptionsID: string[];
  }
  export interface NewBody extends IAccount.NewBody { }
  export interface PasswordResetBody {
    id: string;
    password: string;
  }
}