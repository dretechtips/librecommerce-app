import { IPAddress } from "../type/Location";

export interface Body {
  customerID: string;
  reason: string;
}

export interface SearchQuery {
  customerID: string;
  date: Date,
  ipAddress: IPAddress[],
}