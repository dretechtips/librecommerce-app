import { BanDependentDOT } from "../Ban.interface";

export interface AppealDOT extends BanDependentDOT {
  message: string;
  resolution: AppealResolution;
}

export enum AppealResolution {
  RESOLVE,
  REJECT
}
