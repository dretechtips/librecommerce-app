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

export interface AccountTypeService {
  isAccountType(id: string): Promise<boolean>;
}

export enum AccountType {
  CUSTOMER,
  ADMIN,
  NONE
}

export interface PaymentsContainer {
  paymentsID: string;
}
