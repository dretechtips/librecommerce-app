/**
 * @typedef T Invalid State
 */
export interface InputProps<T extends {}> {
  name: string;
  example: string;
  value: string;
  verify: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid: (keyof T)[];
  invalid: InputValidity<T>;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface InputMessage {
  success: string;
  fail: string;
}

export type InputValidity<T extends {}> = {
  [K in keyof T]: InputMessage;
};

export interface TextInputProps {
  value: string;
  placeholder: string;
}
