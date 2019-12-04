import { InputProps, InputUIProps } from "./Input.interface";

export interface PasswordInputProps extends InputProps {}

export interface PasswordInputUIProps
  extends InputUIProps<typeof InvalidState> {}

export interface PasswordInputState {
  password: string;
  valid: (keyof typeof InvalidState)[];
}

export enum InvalidState {
  TOOSHORT,
  TOOLONG,
  NO_CAPITAL_LETTER,
  NO_SPECIAL_CHAR
}
