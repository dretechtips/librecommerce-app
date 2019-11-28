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
  onInput: (
    key: keyof T,
    key2: keyof T[keyof T] | undefined,
    value: any
  ) => void;
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

export type Primitives =
  | boolean
  | null
  | undefined
  | number
  | bigint
  | string
  | symbol;

export function isFormGroup(
  type: FormGroup<any> | FormQuestion
): type is FormGroup<any> {
  return (
    (type as FormGroup<any>).category !== undefined &&
    (type as FormGroup<any>).questions !== undefined
  );
}

export interface FormGroup<T> {
  category: string;
  questions: FormRelation<T>;
}

export type FormRelation<T> = {
  [K in keyof T]: T[K] extends Primitives | Primitives[]
    ? FormQuestion
    : FormGroup<T[K]>;
};

export type FormInput =
  | "checkbox"
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
