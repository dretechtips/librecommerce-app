export interface LoginProps {
  logoURL: string;
  loginApp: () => void;
}

export interface LoginState {
  failed: boolean;
}

export interface LoginUIProps {
  logoURL: string;
  failed: boolean;
  login: (username: string, password: string) => void
}