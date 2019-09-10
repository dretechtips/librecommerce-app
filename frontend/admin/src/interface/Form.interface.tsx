export interface FormProps
{
  questions: FormQuestion[],
  modifier: "read" | "write",
}

export interface FormState
{
  modifier: "read" | "write",
}

export interface FormQuestion
{
  label: string,
  type: "input" | "textarea" | "select" | "checkbox",
  inputType?: string,
  options?: string[]
}