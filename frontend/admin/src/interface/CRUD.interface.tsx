import { LookupbarResult } from "./Lookupbar.interface";
import { FormModifier, FormRelation, AsyncForm } from "./Form.interface";
import { AnyMap } from "../utils/Types";

export interface CRUDComponentProps {
  name: string;
  getQuestions: (type: "client" | "server" | "all") => Promise<AsyncForm>;
  result: (id: AnyMap) => Promise<LookupbarResult[]>;
  fetch: (id: string) => Promise<AnyMap>;
  new: (value: AnyMap) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (value: AnyMap) => Promise<void>;
  query: (value: AnyMap) => Promise<AnyMap[]>;
  page: CRUDPage | undefined;
  path: string;
}

export interface CRUDComponentUIProps extends CRUDComponentProps {}

export interface CRUDComponentState {
  page: CRUDPage;
}

export type CRUDPage = "read" | "create" | "update" | "search";

interface CRUDPageProps {
  title: string;
  getQuestions: (type: "client" | "server" | "all") => Promise<AsyncForm>;
}

export interface CreatePageProps extends CRUDPageProps {
  submit: (value: AnyMap) => Promise<void>;
}

export interface UpdatePageProps extends CRUDPageProps {
  get: (id: string) => Promise<AnyMap>;
  submit: (value: AnyMap) => Promise<void>;
}

export interface ReadPageProps extends CRUDPageProps {
  get: (id: string) => Promise<any>;
}

export interface SearchPageProps extends CRUDPageProps {
  submit: (value: AnyMap) => Promise<LookupbarResult[]>;
}

export interface FormProps {
  questions: FormRelation<any>;
}

export type MapToInt<T> = { [K in keyof T]: number };
