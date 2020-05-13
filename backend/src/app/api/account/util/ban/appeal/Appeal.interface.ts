import { BanDependentDOT } from "../Ban.interface";

export interface AppealDOT {
  /**
   * User sent message
   */
  message: string;
  /**
   * Employee ID who been assigned to review this case
   */
  reviewedBy: string;
  /**
   * Status given by the reviewer
   */
  status: AppealStatus;
}

export enum AppealStatus {
  PROCESSING,
  ACCEPTED,
  DECLINE
}

export interface AppealDependentDOT {
  appealIDs: string[];
}
