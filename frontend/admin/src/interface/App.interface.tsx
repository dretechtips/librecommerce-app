import { ProfileProps } from "../interface/Profile.interface";

export interface AppState {
  login: boolean;
  profile: ProfileProps;
  actions: AppAction;
  logoURL: string;
}

export interface AppAction {}

export interface AppProps {
  logoURL: string;
}
