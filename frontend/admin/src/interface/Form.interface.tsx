import { AxiosResponse } from "axios";
import {
  TextInputProps,
  CheckboxInputProps,
  TextAreaInputProps,
  TextAreaListInputProps,
  SelectInputProps,
  DateInputProps
} from "./Input.interface";
import { BarcodeScannerInputProps } from "./BarcodeScannerBox.interface";
import { FileUploadInputProps } from "./FileUpload.interface";
import { PhotoUploadInputProps } from "./PhotoUpload.interface";
import { TagsBoxInputProps } from "./Tagsbox.interface";
import { DateRangeInputProps } from "./DateRangeInput.interface";

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

export type FormQuestion = {
  question: string;
} & FormInputConditional<FormInput>;

export type FormInputConditional<T extends FormInput> = T extends string
  ? { input: Exclude<FormInput, FormInputType<any, any>>; props?: undefined }
  : Extract<FormInput, FormInputType<any, any>>;

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

export type FormInputType<T, D extends string> = {
  props?: T extends never ? undefined : Partial<T>;
  input: D;
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
  | "email"
  | FormInputType<TextInputProps, "text">
  | FormInputType<CheckboxInputProps, "checkbox">
  | FormInputType<TextAreaInputProps, "textarea">
  | FormInputType<TextAreaListInputProps, "textarea-list">
  | FormInputType<SelectInputProps, "select">
  | FormInputType<DateInputProps, "date">
  | FormInputType<BarcodeScannerInputProps, "barcode">
  | FormInputType<FileUploadInputProps, "file">
  | FormInputType<PhotoUploadInputProps, "photo">
  | FormInputType<TagsBoxInputProps, "tagsbox">
  | FormInputType<DateRangeInputProps, "date-range">;
