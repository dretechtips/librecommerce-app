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
  question: string,
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
}