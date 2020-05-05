import { AccountDependentDOT } from "../Account.interface";

export interface CompanyDOT extends AccountDependentDOT {
  name: string;
  taxID: string;
  storeIDs: string[];
}
