import React from "react";
import { InputProps } from "./Input.interface";

export interface StreetAddressInputProps
  extends Required<Pick<InputProps<any>, "onInput">> {}

export interface StreetAddressInputUIProps {
  value: string;
  valid: (keyof typeof InvalidState)[];
  verify: (e: React.ChangeEvent<HTMLInputElement>) => void;
  example: string;
}

export interface StreetAddressInputState {
  input: string;
  housing: number;
  street: string;
  type: string;
  apt: number;
  valid: (keyof typeof InvalidState)[];
}

export const enum InvalidState {
  HOUSING,
  STREET,
  TYPE,
  APT,
  PARAM_OVERFLOW,
  PARAM_UNDERFLOW
}
