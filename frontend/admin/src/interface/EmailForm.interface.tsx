export interface EmailFormProps {
  logoURL: string;
}

export interface EmailFormUIProps extends EmailFormProps, EmailFormQuestions {
  getInputs: (values: { [K in keyof EmailFormQuestions]: string }) => void;
  download: () => Promise<void>;
  print: () => Promise<void>;
}

export interface EamilFormState extends EmailFormQuestions {}

export interface EmailFormQuestions {
  to: string;
  name: string;
  subject: string;
  body: string;
}
