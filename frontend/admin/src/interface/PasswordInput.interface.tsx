export interface PasswordInputProps {}

export interface PasswordInputUIProps extends PasswordInputProps {
  validityStates: InvalidityState[] | true;
  password: string;
  validation: (ref: React.ChangeEvent<HTMLInputElement> | null) => void;
  min: number;
  max: number;
  help: boolean;
  displayHelp: () => void;
  undisplayHelp: () => void;
  generatePassword: () => void;
}

export interface PasswordInputState {
  password: string;
  validityStates: InvalidityState[] | true;
  help: boolean;
}

export enum InvalidityState {
  tooShort,
  tooLong,
  noCapitalLetter,
  noSpecialChar
}
