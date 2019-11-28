import { AccountData } from "./routes/Account.interface";
import { FormRelation } from "./Form.interface";

export interface MessageFormProps {
  getAccounts: () => Promise<AccountData[]>;
}

export interface MessageFormUIProps extends MessageFormProps {
  subject: string;
  body: string;
  questions: FormRelation<MessageFormQuestions>;
}

export interface MessageFormState extends MessageFormQuestions {}

export interface MessageFormQuestions {
  accountID: string | null;
  subject: string;
  body: string;
}
