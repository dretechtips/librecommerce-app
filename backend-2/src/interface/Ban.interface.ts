import { IPAddress } from "../type/Location";

export interface BanCompileType {
  customerID: string;
  date: string;
}

export interface BanAppealCompileType {
  message: string;
  banID: string;
  resolution: string;
}
