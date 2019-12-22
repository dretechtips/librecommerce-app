import { AccountData, NewAccountData } from "./Account.interface";
import { Payroll } from "./Payroll.interface";

export interface LoginProps {
  login: () => void;
}

export interface LoginState {}

export interface LoginFunc {
  (): void;
}

export interface UserData extends AccountData {
  privilege: string;
  position: string;
  payroll: Payroll;
  payment: string;
  schedule: string;
  lastPayment: string;
  rank: string;
}

export type NewUserData = Omit<
  Omit<UserData, keyof AccountData>,
  "rank" | "lastPayment"
> &
  NewAccountData;
