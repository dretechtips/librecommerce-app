import { AppealDependentDOT } from "./appeal/Appeal.interface";

export interface BanDOT extends AppealDependentDOT {
  reason: string;
  revoke: boolean;
  lifetime: BanLifetime;
}

export interface BanDependentDOT {
  banIDs: string[];
}

export enum BanLifetime {
  NONE,
  TEMPORARY,
  PERMANENT
}
