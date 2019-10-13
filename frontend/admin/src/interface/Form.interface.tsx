export interface FormProps
{
  questions: FormQuestion[];
  modifier: FormModifier;
  submit?: (inputs: any[]) => void;
}

export interface FormState
{
  modifier: FormModifier,
}

export type FormModifier = "read" | "write";

export interface FormQuestion
{
  question: string,
  input: "text" | "textarea" | "textarea-list" | "select" | "date" | "date-range",
  placeholder?: string;
  options?: string[];
}