import { AxiosResponse } from "axios";

export interface FormProps<T> {
  questions: FormQuestion[] | FormRelation<T>;
  modifier: FormModifier;
  submit?: (inputs: { [K in keyof T]: any }) => Promise<AxiosResponse>;
  inputs?: (inputs: { [K in keyof T]: any }) => void;
}

export interface FormUIProps<T> extends Omit<FormProps<T>, "submit"> {
  submit: ((inputs: { [K in keyof T]: any }) => Promise<void>) | undefined;
  values: { [K in keyof T]: any };
  onInput: (key: keyof T, value: any) => void;
  success?: boolean;
  error?: string;
}

export interface FormState<T> {
  modifier: FormModifier;
  values: { [K in keyof T]: any };
  loading: boolean;
  error?: string;
  success: boolean;
}

export type FormModifier = "read" | "write";

export interface FormQuestion {
  question: string;
  input: FormInput;
  placeholder?: string;
  options?: string[];
}

export type FormRelation<T> = { [K in keyof T]: FormQuestion };

export type FormInput =
  | "text"
  | "textarea"
  | "textarea-list"
  | "select"
  | "date"
  | "date-range"
  | "barcode"
  | "file"
  | "photo"
  | "tagsbox"
  | "password"
  | "address"
  | "email";
