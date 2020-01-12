import { LookupbarResult } from "./Lookupbar.interface";
import { FormModifier, FormRelation, AsyncForm } from "./Form.interface";
import { AnyMap } from "../utils/Types";
import { AxiosResponse } from "axios";
import { RouteComponentProps } from "react-router";

export interface CRUDComponentProps
  extends RouteComponentProps<{ page?: string | undefined }> {
  serverName: string;
  clientName: string;
}

export interface CRUDComponentUIProps extends CRUDComponentProps {
  getQuestions: (type: CRUDQuestionsType) => Promise<AxiosResponse>;
  fetch: (id: string) => Promise<AxiosResponse>;
  new: (value: AnyMap) => Promise<AxiosResponse>;
  delete: (id: string) => Promise<AxiosResponse>;
  update: (value: AnyMap) => Promise<AxiosResponse>;
  query: (value: AnyMap) => Promise<AxiosResponse>;
}

export interface CRUDComponentState {
  page: CRUDPage;
}

export type CRUDPage = "read" | "create" | "update" | "search";

export type CRUDQuestionsType = "client" | "server" | "all";

interface CRUDPageProps {
  title: string;
  getQuestions: (type: CRUDQuestionsType) => Promise<AsyncForm>;
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
