import { Address, EmailAddress, PhoneNum } from "../type/Location";
import { Schedule } from "../model/Schedule";
import { Alert } from "../model/Alert";
import { ScheduleBody } from "./Schedule.inteface";
import { IAccount } from "./Account.interface";

export namespace IUser {
  export interface Constructor extends IAccount.Constructor {
    privilege: PRIVILEGE,
    schedule: Schedule,
    position: Position,
    rank: RANK,
  }
  export interface NewBody extends IAccount.NewBody {
    address: string;
    position: Position;
    privilege: PRIVILEGE;
    schedule: ScheduleBody,
  }
  export type Position = "OWNER" | "MANAGER" | "STOCKER_SHIPPER" | "DEVELOPER";
  export type RANK = "RANK_1" | "RANK_2" | "RANK_3";
  export enum PRIVILEGE {
    BASIC,
    MOD,
    ADMIN
  }
}


