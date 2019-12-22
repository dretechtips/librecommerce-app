import { AxiosResponse } from "axios";
import {
  FormInputs,
  FormInputConditional
} from "../interface/FormInput.interface";
import { FormField } from "../components/FormField";
import FormFieldGroup from "../components/FormFieldGroup";
import { NoInfer } from "../utils/Types";

export interface FormProps<T> {
  questions: FormRelation<T>;
  modifier: FormModifier;
  submit?: (inputs: { [K in keyof T]: any }) => Promise<AxiosResponse>;
  inputs?: (inputs: { [K in keyof T]: any }) => void;
}

export interface FormUIProps<T> extends Omit<FormProps<T>, "submit"> {
  submit: ((inputs: { [K in keyof T]: any }) => Promise<void>) | undefined;
  values: { [K in keyof T]: any };
  onInput: (nNode: string, nParent: string, value: any) => void;
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

export type FormQuestionProps = FormInputConditional<FormInputs> & {
  label: string;
};

export interface FormQuestionGroupProps<T> {
  category: string;
  questions: NoInfer<FormRelation<Required<T>>>;
}

export type Primitives =
  | boolean
  | null
  | undefined
  | number
  | bigint
  | string
  | symbol;

export type FormRelation<T> = {
  [K in keyof T]: T[K] extends Primitives | Primitives[]
    ? FormField
    : FormFieldGroup<T[K]>;
};

export type FormCleared<T> = {
  [K in keyof T]: T[K] extends Primitives | Primitives[]
    ? undefined
    : FormCleared<T>;
};
