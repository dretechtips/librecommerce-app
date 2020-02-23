import { AlertDependentDOT } from "../alert/Alert.interface";

export interface AccountDOT extends AlertDependentDOT {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  fingerprints: string[];
  emailAddress: string;
  phoneNum: string;
  address: string;
  active: boolean;
}

export type PreAccountDOT = Omit<AccountDOT, "alertIDs" | "fingerprints">;

export interface AccountDependentDOT {
  accountID: string;
}
