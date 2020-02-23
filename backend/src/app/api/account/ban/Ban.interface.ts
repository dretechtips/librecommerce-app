import { AccountDependentDOT } from "../Account.interface";

export interface BanDOT extends AccountDependentDOT {
  date: Date;
  reason: string;
  revoke: boolean;
  lifetime: BanLifetime;
}

export interface BanDependentDOT {
  banID: string;
}

export enum BanLifetime {
  TEMPORARY,
  PERMANENT
}
