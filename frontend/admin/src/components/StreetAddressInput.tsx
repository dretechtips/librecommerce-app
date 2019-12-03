import React from "react";
import {
  StreetAddressInputUIProps,
  InvalidState
} from "../interface/StreetAddressInput.interface";
import Input from "./Input";

function StreetAddressInput(props: StreetAddressInputUIProps) {
  return <Input<typeof InvalidState> {...props} />;
}

export default StreetAddressInput;
