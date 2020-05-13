import { AccountDOT } from "../Account.interface";

export interface CompanyDOT extends AccountDOT  {
  name: string;
  taxID: string;
  storeIDs: string[];
}
