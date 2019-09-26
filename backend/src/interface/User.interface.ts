import { Address, EmailAddress, PhoneNum } from "../type/Location";
import { Schedule } from "../model/Schedule";
import { Alert } from "../model/Alert";

export interface UserConstructor
{
  id: string,
  firstName: string,
  lastName: string,
  privilege: PRIVILEGE,
  username: string,
  password: string,
  address: Address,
  emailAddress: EmailAddress,
  phoneNum: PhoneNum,
  schedule: Schedule,
  position: Position,
  alerts: Alert[],
}

export interface UserBody {
  nameInfo: string;
  privilege: number;
  loginInfo: string;
  address: string;
  emailAddress: string;
  phoneNum: string;
  position: Position;
}

export type Position = "OWNER" | "MANAGER" | "STOCKER_SHIPPER" | "DEVELOPER";

export enum PRIVILEGE
{
  BASIC,
  MOD,
  ADMIN
}