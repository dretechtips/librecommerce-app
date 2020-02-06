export interface AccountDOT {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  associatedIPs: string[];
  emailAddress: string;
  phoneNum: string;
  address: string;
  alertIDs: string[];
}

export type AccountType = "customer" | "admin" | "none";
