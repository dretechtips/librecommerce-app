import React from "react";
import {
  StreetAddressInputUIProps,
  InvalidState
} from "../interface/StreetAddressInput.interface";
import Input from "./Input";
import { InputValidity } from "../interface/Input.interface";

function StreetAddressInput(props: StreetAddressInputUIProps) {
  const invalid: InputValidity<typeof InvalidState> = {
    APT: {
      success: "Valid Apartment Number",
      fail: "Invalid Apartment Number"
    },
    HOUSING: {
      success: "Valid Housing Number",
      fail: "Invalid Housing Number"
    },
    STREET: { success: "Valid Street", fail: "Invalid Street" },
    TYPE: { success: "Valid Street Type", fail: "Invalid Street Type" },
    PARAM_OVERFLOW: {
      success: "Street Address has under 5 param",
      fail: "Street Address has over 4 param"
    },
    PARAM_UNDERFLOW: {
      success: "Street Address has over 2 param",
      fail: "Street Address has under 3 param"
    }
  };
  return (
    <Input<typeof InvalidState>
      name={"Street Address"}
      value={props.value}
      valid={props.valid}
      invalid={invalid}
      example={props.example}
      verify={props.verify}
    />
  );
}

export default StreetAddressInput;
