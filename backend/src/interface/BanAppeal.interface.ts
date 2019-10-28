import Ban from "../model/Ban";
import * as IBan from "../interface/Ban.interface";
import { IPAddress } from "src/type/Location";

export interface Constructor {
  msg: string;
  ban: Ban;
}

export interface AppealBody {
  caseID: string,
  message: string,
  ban: IBan.Body,
}

export interface AppealReview {
  caseID: string;
  resolution: "resolve" | "reject";
}

export interface SearchQuery {
  customerID: string,
  date: Date,
  ipAddress: IPAddress[],
  caseID: string;
}