import { InputProps, InputUIProps } from "./Input.interface";

export interface EmailAddressInputProps extends InputProps {}

export interface EmailAddressInputUIProps
  extends InputUIProps<typeof InvalidState> {}

export interface EmailAddressInputState {
  value: string;
  valid: (keyof typeof InvalidState)[];
}

export enum InvalidState {
  NO_AT,
  NO_DOMAIN,
  NO_EXTENSION
}
