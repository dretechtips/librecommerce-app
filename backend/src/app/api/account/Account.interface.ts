import { AlertContainer } from "../alert/Alert.interface";

export interface AccountDOT extends AlertContainer {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  fingerprints: string[];
  emailAddress: string;
  phoneNum: string;
  address: string;
  alertIDs: string[];
}

export type PreAccountDOT = Omit<AccountDOT, "alertIDs" | "fingerprints">;

export type AccountType = "customer" | "admin" | "none";

export interface PaymentsContainer {
  paymentsID: string;
}
