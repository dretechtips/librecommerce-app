import { IPAddress } from "../type/Location";

export interface BanBody {
  customerID: string;
  reason: string;
}

export interface BanAppealBody {
  caseID: string,
  message: string,
  customerID: string;
}

export interface BanAppealReview {
  caseID: string;
  resolution: "resolve" | "reject";
}