import { ProfileProps } from "../interface/Profile.interface";

export interface AppState
{
  login: boolean;
  profile: ProfileProps;
  sidePanel: boolean;
  actions: AppAction;
}

export interface AppAction {
  toggleSidePanel: () => void;
}

export interface AppProps
{
  logoURL: string;
}