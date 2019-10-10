import { ProfileProps } from "../interface/Profile.interface";

export interface AppState
{
  login: boolean;
  profile: ProfileProps;
}

export interface AppProps
{
  logoURL: string;
}