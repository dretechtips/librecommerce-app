import { ContactDependentDOT } from "src/app/common/model/schema/Contact.schema";
import { AlertDependentDOT } from "../alert/Alert.interface";

export interface AccountDOT extends AlertDependentDOT, ContactDependentDOT {
  username: string;
  password: string;
  fingerprints: string[];
  active: boolean;
}

export type PreAccountDOT = Omit<AccountDOT, "alertIDs" | "fingerprints">;

export interface AccountDependentDOT {
  accountID: string;
}
