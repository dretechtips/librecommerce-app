export interface EmailFormProps {
  logoURL: string;
}

export interface EmailFormUIProps extends EmailFormProps, EmailFormQuestions {
  getInputs: (values: { [K in keyof EmailFormQuestions]: string }) => void;
  download: () => Promise<void>;
}

export interface EamilFormState extends EmailFormQuestions {}

export interface EmailFormQuestions {
  to: string | null;
  name: string | null;
  subject: string | null;
  body: string | null;
}
