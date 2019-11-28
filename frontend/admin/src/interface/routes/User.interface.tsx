import { AccountData, NewAccountData } from "./Account.interface";

export interface LoginProps {
  login: LoginFunc;
}

export interface LoginState {}

export interface LoginFunc {
  (): void;
}

export interface UserData extends AccountData {
  privilege: string;
  position: string;
  payroll: number;
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
