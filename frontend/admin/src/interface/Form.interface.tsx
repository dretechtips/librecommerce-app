import { AxiosResponse } from "axios";

export interface FormProps {
  questions: FormQuestion[];
  modifier: FormModifier;
  submit?: (inputs: any[]) => Promise<AxiosResponse>;
}

export interface FormUIProps extends Omit<FormProps, "submit"> {
  values: any[];
  submit?: (inputs: any[]) => void;
  success?: boolean;
  error?: string;
}

export interface FormState {
  modifier: FormModifier;
  values: any[];
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
  | "tagsbox";
