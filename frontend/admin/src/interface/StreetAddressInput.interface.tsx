import React from "react";
import { InputProps, InputUIProps } from "./Input.interface";

export interface StreetAddressInputProps extends InputProps {}

export interface StreetAddressInputUIProps
  extends InputUIProps<typeof InvalidState> {}

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
