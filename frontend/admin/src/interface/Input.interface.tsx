import Button from "../components/Button";
import React from "react";
import { ButtonProps } from "./Button.interface";

/**
 * @typedef T Invalid State
 */
export interface InputUIProps<T extends {}> extends InputProps {
  name: string;
  example: string;
  value: string;
  verify: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid: (keyof T)[];
  invalid: InputValidity<T>;
  buttons?: ButtonProps[];
}

export interface InputProps {
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onVerified?: (e: React.FormEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  value?: string;
  append?: InputGroup[];
  prepend?: InputGroup[];
}

export type InputGroup =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "button";
      text: string;
      action: () => void;
    };

export interface InputMessage {
  success: string;
  fail: string;
}

export type InputValidity<T extends {}> = {
  [K in keyof T]: InputMessage;
};

export interface TextInputProps {
  value?: string;
  placeholder?: string;
}

export interface CheckboxInputProps {
  value?: boolean;
}

export interface TextAreaInputProps {
  rows?: number;
  value?: string;
  placeholder?: string;
}

export interface TextAreaListInputProps extends TextAreaInputProps {
  list?: "ol" | "ul";
}

export interface SelectInputProps {
  option?: string[];
  selected?: number;
}

export interface DateInputProps {
  date?: Date;
}
