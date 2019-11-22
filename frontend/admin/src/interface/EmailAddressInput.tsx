import { InputValidity } from "./Input.interface";

export interface EmailAddressInputProps {}

export interface EmailAddressInputUIProps extends EmailAddressInputProps {
  name: string;
  value: string;
  example: string;
  verify: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: InputValidity<typeof InvalidState>;
  valid: (keyof typeof InvalidState)[];
}

export interface EmailAddressInputState {
  value: string;
  valid: (keyof typeof InvalidState)[];
}

export enum InvalidState {
  NO_AT,
  NO_DOMAIN,
  NO_EXTENSION
}
