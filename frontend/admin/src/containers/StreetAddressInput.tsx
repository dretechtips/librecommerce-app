import React, { Component } from "react";
import {
  StreetAddressInputState,
  StreetAddressInputProps,
  InvalidState
} from "../interface/StreetAddressInput.interface";
import StreetAddressInputUI from "../components/StreetAddressInput";

export class StreetAddressInput extends Component<
  StreetAddressInputProps,
  StreetAddressInputState
> {
  constructor(props: StreetAddressInputProps) {
    super(props);
    this.state = {
      input: "",
      housing: -1,
      street: "",
      type: "",
      apt: -1,
      valid: [
        InvalidState.PARAM_UNDERFLOW,
        InvalidState.HOUSING,
        InvalidState.STREET,
        InvalidState.TYPE
      ]
    };
  }
  public verify = (e: React.ChangeEvent<HTMLInputElement> | null): void => {
    if (e === null) return;
    const state: InvalidState[] = [];
    const address: string = e.currentTarget.value;
    const aAddress: string[] = address.split(" ");
    if (aAddress.length < 3) state.push(InvalidState.PARAM_UNDERFLOW);
    if (aAddress.length > 4) state.push(InvalidState.PARAM_OVERFLOW);
    if (!this.cHousingNumber(aAddress[0])) state.push(InvalidState.HOUSING);
    if (!this.cStreet(aAddress[1])) state.push(InvalidState.STREET);
    if (!this.cStreetType(aAddress[2])) state.push(InvalidState.TYPE);
    if (aAddress[3]) if (!this.cApt(aAddress[3])) state.push(InvalidState.APT);
    this.setState({ ...this.state, input: address, valid: state });
  };
  private cHousingNumber(s: string): boolean {
    if (!s) return false;
    const number: number = Number(s);
    if (number === NaN) return false;
    if (s.length > 2 && s.length < 6) return false;
    return true;
  }
  private cStreet(s: string): boolean {
    if (!s) return false;
    return true;
  }
  private cStreetType(s: string): boolean {
    if (!s) return false;
    return true;
  }
  private cApt(s: string): boolean {
    if (!s) return false;
    const number: number = Number(s);
    if (number === NaN) return false;
    if (s.length > 2 && s.length < 6) return false;
    return true;
  }
  render() {
    return (
      <StreetAddressInputUI
        value={this.state.input}
        valid={this.state.valid}
        verify={this.verify}
      />
    );
  }
}

export default StreetAddressInput;
