import React, { Component } from "react";
import {
  PasswordInputProps,
  PasswordInputState,
  InvalidState
} from "../interface/PasswordInput.interface";
import PasswordInputUI from "../components/PasswordInput";
import { InputValidity, InputUIProps } from "../interface/Input.interface";

export class PasswordInput extends Component<
  PasswordInputProps,
  PasswordInputState
> {
  private name: string = "Password Input";
  public invalid: InputValidity<typeof InvalidState> = {
    TOOLONG: {
      success: "Password isn't too long.",
      fail: "Password is too long."
    },
    TOOSHORT: {
      success: "Password isn't too short.",
      fail: "Password is too short"
    },
    NO_CAPITAL_LETTER: {
      success: "Password has at least one captial letter",
      fail: "Password doesn't have a capital letter"
    },
    NO_SPECIAL_CHAR: {
      success: "Password has at least one special character",
      fail: "Password doesn't jave a special character."
    }
  };
  private min: number = 8;
  private max: number = 25;
  private sCharSet: string[];
  constructor(props: PasswordInputProps) {
    super(props);
    this.state = {
      password: "",
      valid: ["NO_CAPITAL_LETTER", "NO_SPECIAL_CHAR", "TOOSHORT"]
    };
    this.sCharSet = this.initCharSetS();
  }
  public generatePassword = (): void => {
    const array: string[] = new Array(13)
      .fill("a")
      .map(cur => this.generateChar("lower"));
    array.push(this.generateChar("upper"));
    array.unshift(this.generateSpecialChar());
    this.setState({
      ...this.state,
      password: array.join(""),
      valid: []
    });
  };
  public validation = (
    ref: React.ChangeEvent<HTMLInputElement> | null
  ): void => {
    if (!ref) return;
    const s: string = ref.currentTarget.value;
    let state: InvalidState[] | true = [];
    if (this.isTooShort(s)) state.push(InvalidState.TOOSHORT);
    if (this.isTooLong(s)) state.push(InvalidState.TOOLONG);
    if (!this.hasCapitalLetter(s)) state.push(InvalidState.NO_CAPITAL_LETTER);
    if (!this.hasSpecialCharacter(s)) state.push(InvalidState.NO_SPECIAL_CHAR);
    if (state.length === 0) state = true;
    this.setState({ ...this.state, valid: [], password: s });
  };
  private generateChar(casing: "upper" | "lower"): string {
    const offset: number = Math.ceil(Math.random() * 100) % 26;
    switch (casing) {
      case "upper":
        return String.fromCharCode(65 + offset);
      case "lower":
        return String.fromCharCode(97 + offset);
    }
  }
  private generateSpecialChar(): string {
    const offset: number =
      Math.ceil(Math.random() * 100) % this.sCharSet.length;
    return this.sCharSet[offset];
  }
  private initCharSetS(): string[] {
    const startA: number = 33;
    const stopA: number = 46;
    const startB: number = 58;
    const stopB: number = 64;
    const startC: number = 91;
    const stopC: number = 95;
    const array: string[] = new Array(
      stopA - startA + stopB - startB + stopC - startC
    );
    let counter = 0;
    for (let i = 0; i < stopA - startA + 1; i++) {
      array[counter] = String.fromCharCode(startA + i);
      counter++;
    }
    for (let i = 0; i < stopB - startB + 1; i++) {
      array[counter] = String.fromCharCode(startB + i);
      counter++;
    }
    for (let i = 0; i < stopC - startC + 1; i++) {
      array[counter] = String.fromCharCode(startC + i);
      counter++;
    }
    return array;
  }
  private isTooShort(s: string): boolean {
    if (s.length < this.min) return true;
    return false;
  }
  private isTooLong(s: string): boolean {
    if (s.length > this.max) return true;
    return false;
  }
  private hasCapitalLetter(s: string): boolean {
    const chars: string[] = s
      .split("")
      .filter(cur => cur.charCodeAt(0) > 64 && cur.charCodeAt(0) < 91);
    if (chars.length > 0) return true;
    return false;
  }
  private hasSpecialCharacter(s: string): boolean {
    const chars: string[] = s.split("").filter(cur => cur.match(/[\W_]+/));
    if (chars.length > 0) return true;
    return false;
  }
  render() {
    return (
      <PasswordInputUI
        {...this.props}
        name={this.name}
        example={""}
        value={this.state.password}
        verify={this.validation}
        valid={this.state.valid}
        invalid={this.invalid}
      />
    );
  }
}

export default PasswordInput;
