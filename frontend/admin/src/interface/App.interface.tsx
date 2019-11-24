import { ProfileProps } from "../interface/Profile.interface";

export interface AppState {
  login: boolean;
  profile: ProfileProps;
  sidePanel: boolean;
  actions: AppAction;
  logoURL: string;
}

export interface AppAction {
  toggleSidePanel: () => void;
}

export interface AppProps {
  logoURL: string;
}
