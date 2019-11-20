import React, { Component } from "react";
import {
  PasswordInputProps,
  PasswordInputState,
  InvalidityState
} from "../interface/PasswordInput.interface";
import PasswordInputUI from "../components/PasswordInput";

export class PasswordInput extends Component<
  PasswordInputProps,
  PasswordInputState
> {
  private min: number = 8;
  private max: number = 25;
  private sCharSet: string[];
  constructor(props: PasswordInputProps) {
    super(props);
    this.state = {
      password: "",
      validityStates: [
        InvalidityState.tooShort,
        InvalidityState.noCapitalLetter,
        InvalidityState.noSpecialChar
      ],
      help: false
    };
    this.sCharSet = this.initCharSetS();
  }
  public displayHelp = (): void => {
    this.setState({ ...this.state, help: true });
    return;
  };
  public undisplayHelp = (): void => {
    this.setState({ ...this.state, help: false });
    return;
  };
  public generatePassword = (): void => {
    const array: string[] = new Array(13)
      .fill("a")
      .map(cur => this.generateChar("lower"));
    array.push(this.generateChar("upper"));
    array.unshift(this.generateSpecialChar());
    this.setState({
      ...this.state,
      password: array.join(""),
      validityStates: true
    });
  };
  public validation = (
    ref: React.ChangeEvent<HTMLInputElement> | null
  ): void => {
    if (!ref) return;
    const s: string = ref.currentTarget.value;
    let state: InvalidityState[] | true = [];
    if (this.isTooShort(s)) state.push(InvalidityState.tooShort);
    if (this.isTooLong(s)) state.push(InvalidityState.tooLong);
    if (!this.hasCapitalLetter(s)) state.push(InvalidityState.noCapitalLetter);
    if (!this.hasSpecialCharacter(s)) state.push(InvalidityState.noSpecialChar);
    if (state.length === 0) state = true;
    this.setState({ ...this.state, validityStates: state, password: s });
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
        generatePassword={this.generatePassword}
        validityStates={this.state.validityStates}
        password={this.state.password}
        validation={this.validation}
        min={this.min}
        max={this.max}
        help={this.state.help}
        displayHelp={this.displayHelp}
        undisplayHelp={this.undisplayHelp}
      />
    );
  }
}

export default PasswordInput;
