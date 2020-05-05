import { AccountDependentDOT } from "../../Account.interface";

export interface StoreDOT extends AccountDependentDOT {
  codeName: string;
  type: StoreType;
}
/**
 * SM - 0 - 20 Employees
 * MD - 20 - 500 Employees
 * LG - 500 - Infinity Employees
 */
export enum StoreType {
  SM_RETAIL,
  MD_RETAIL,
  LG_RETAIL,
  SM_WHOLESALE,
  MD_WHOLESALE,
  LG_WHOLESALE,
  SM_BOTH,
  MD_BOTH,
  LG_BOTH
}
