import {
  FormProps,
  FormUIProps,
  FormRelation,
  FormModifier
} from "./Form.interface";
import { FormInputGroupProps } from "./FormInputGroup.interface";
import { AxiosResponse } from "axios";

export interface FormFieldsProps<T> {
  questions: FormRelation<T> | (() => Promise<FormRelation<T>>);
  modifier: FormModifier;
  parent?: string | null;
  onInput: (node: string, parent: string | null, value: any) => void;
}

export interface FormFieldsUIProps<T> extends FormFieldsProps<T> {}

export interface FormFieldsState<T> {
  modifier: FormModifier;
  loading: boolean;
}
