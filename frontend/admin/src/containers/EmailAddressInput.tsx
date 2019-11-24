import React, { Component } from "react";
import {
  EmailAddressInputProps,
  EmailAddressInputState,
  InvalidState
} from "../interface/EmailAddressInput";
import EmailAddressInputUI from "../components/EmailAddressInput";
import { InputValidity } from "../interface/Input.interface";

export class EmailAddressInput extends Component<
  EmailAddressInputProps,
  EmailAddressInputState
> {
  public name: string = "Email Address";
  public example: string = "username@example.com";
  public invalid: InputValidity<typeof InvalidState> = {
    NO_AT: { success: "There a username", fail: "No username" },
    NO_DOMAIN: { success: "There a domain", fail: "No domain" },
    NO_EXTENSION: {
      success: "There a domain extension",
      fail: "No domain extensions"
    }
  };
  constructor(props: EmailAddressInputProps) {
    super(props);
    this.state = {
      value: "",
      valid: ["NO_AT", "NO_DOMAIN", "NO_EXTENSION"]
    };
  }
  public verify = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.currentTarget.value;
    const state: (keyof typeof InvalidState)[] = [];
    if (!this.findAt(value)) state.push("NO_AT");
    if (!this.findDomain(value)) state.push("NO_DOMAIN");
    if (!this.findDomainExtension(value)) state.push("NO_EXTENSION");

    this.setState({ ...this.state, value, valid: state });
  };
  private findAt(s: string): boolean {
    return s.indexOf("@") !== -1;
  }
  private findDomain(s: string): boolean {
    return s.search(/@.*\./) !== -1 ? true : false;
  }
  private findDomainExtension(s: string): boolean {
    return s.search(/\..+/) !== -1 ? true : false;
  }
  render() {
    return (
      <EmailAddressInputUI
        {...this.props}
        name={this.name}
        value={this.state.value}
        example={this.example}
        verify={this.verify}
        invalid={this.invalid}
        valid={this.state.valid}
      />
    );
  }
}

export default EmailAddressInput;
