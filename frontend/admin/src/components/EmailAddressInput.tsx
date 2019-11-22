import React from "react";
import Input from "./Input";
import { InputValidity } from "../interface/Input.interface";
import { EmailAddressInputUIProps } from "../interface/EmailAddressInput";
import { InvalidState } from "../interface/EmailAddressInput";

function EmailAddressInput(props: EmailAddressInputUIProps) {
  return <Input<typeof InvalidState> {...props} />;
}

export default EmailAddressInput;
