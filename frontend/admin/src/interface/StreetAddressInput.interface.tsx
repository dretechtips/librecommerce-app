export interface StreetAddressInputProps {}

export interface StreetAddressInputUIProps {
  value: string;
  valid: InvalidState[];
  verify: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StreetAddressInputState {
  input: string;
  housing: number;
  street: string;
  type: string;
  apt: number;
  valid: InvalidState[];
}

export enum InvalidState {
  HOUSING,
  STREET,
  TYPE,
  APT,
  PARAM_OVERFLOW,
  PARAM_UNDERFLOW
}
