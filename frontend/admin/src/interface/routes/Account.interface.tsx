export interface AccountData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  associatedIPs: string[];
  emailAddress: string;
  phoneNum: string;
  address: string;
  alerts: string[];
}

export type NewAccountData = Omit<
  AccountData,
  "id" | "associatedIPs" | "alerts"
>;
