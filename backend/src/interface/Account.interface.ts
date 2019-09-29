import { IPAddress, EmailAddress, PhoneNum, Address } from "../type/Location";
import { Alert } from "../model/Alert";
import { Password } from "../type/Password";

export namespace IAccount {
  export interface Constructor {
    readonly id: string,
    firstName: string,
    lastName: string,
    username: string,
    password: Password,
    associatedIPs: IPAddress[],
    emailAddress: EmailAddress,
    phoneNum: PhoneNum,
    address: Address;
    alerts: Alert[]s
  }
  export interface NewBody {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    phoneNum: string,
    emailAddress: string,
    address: string,
  }
}