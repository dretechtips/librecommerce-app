import { AxiosResponse } from "axios";
import {
  FormInputs,
  FormInputConditional
} from "../interface/FormInput.interface";
import { FormField } from "../components/FormField";
import FormFieldGroup from "../components/FormFieldGroup";
import { NoInfer } from "../utils/Types";
import { FormFieldsProps } from "./FormFields.interface";

export interface FormProps<T> {
  title: string;
  fields: Omit<FormFieldsProps<T>, "onInput">;
  submit?: (value: T) => Promise<AxiosResponse>;
  inputs?: (value: T) => void;
}

export interface FormState<T> {
  success: boolean;
  error?: string;
  values: { [K in keyof T]: any };
}

export interface FormUIProps<T>
  extends Omit<FormProps<T>, "submit">,
    Omit<FormState<T>, "values"> {
  onInput: (node: string, parent: string | null, value: any) => void;
  submit?: () => Promise<void>;
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

export function copyFormRelation<T>(
  relations: FormRelation<T>
): FormRelation<T> {
  const object: any = {};
  Object.keys(relations).forEach(key => {
    const cur = relations[key as keyof FormRelation<T>];
    if (cur instanceof FormField) {
      object[key] = new FormField({ question: cur.question() });
    } else if (cur instanceof FormFieldGroup) {
      // console.log(
      //   "Question",
      //   Object.keys(cur.questions()).forEach(key =>
      //     console.log(key, cur.questions()[key as keyof FormRelation<T>])
      //   )
      // );
      object[key] = new FormFieldGroup({
        questions: cur.questions(),
        category: cur.category()
      });
    }
  });
  return object as FormRelation<T>;
}

export type FormCleared<T> = {
  [K in keyof T]: T[K] extends Primitives | Primitives[]
    ? undefined
    : FormCleared<T>;
};
