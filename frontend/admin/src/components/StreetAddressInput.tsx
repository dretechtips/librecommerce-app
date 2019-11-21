import React from "react";
import { StreetAddressInputUIProps, InvalidState } from "../interface/StreetAddressInput.interface";
import Input from "./Input";
import { InputValidity } from "../interface/Input.interface";


function StreetAddressInput(props: StreetAddressInputUIProps) {
  for(let item in InvalidState) {
    item
  }
  const in: InvalidState = 1;
  const invalid: InputValidity<InvalidState> = {
    [InvalidState.APT.toString()]: {},
    [InvalidState.HOUSING.toString()]: {},
    [InvalidState.PARAM_OVERFLOW.toString()]: {},
    [InvalidState.PARAM_UNDERFLOW.toString()]: {},
    [InvalidState.STREET.toString()]: {},
    [InvalidState.TYPE.toString()]: {}
  }
  return <Input<InvalidState> name={"Street Address"} value={props.value} valid={props.valid} invalid={} />
}

export default StreetAddressInput;
