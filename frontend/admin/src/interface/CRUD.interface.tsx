import { LookupbarResult } from "./Lookupbar.interface";
import { FormModifier, FormRelation } from "./Form.interface";
import { ComponentType, ComponentClass } from "react";
import { MainPanelRoute } from "./MainPanel.interface";

export interface CRUDProps {
  paths: CRUDPath;
  selection: Selection;
}

export interface ICRUD<T, K extends Omit<T, any>> {
  name: string;
  questions: () => FormRelation<T>;
  /** @description Client Questions */
  cQuestions: FormRelation<K>;
  /** @description Server Questions */
  sQuestions: FormRelation<Omit<T, Extract<keyof K, keyof T>>>;
  fetch: (id: string) => Promise<T>;
  new: (value: K) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (value: K) => Promise<void>;
  toResult: (value: T) => LookupbarResult;
  query: (value: string) => Promise<T[]>;
}

export interface CRUDPath {
  read: string;
  modify: string;
  search: string;
  create: string;
}

export interface CRUDPagesProps<T, K extends Omit<T, any>> {
  create: CreateProps<K>;
  modify: UpdateDeleteProps<T, K>;
  read: ReadProps<T>;
  search: SearchProps<T>;
  form: FormProps;
}

export interface CRUDPagesFactoryProps {
  selection: Selection;
}

export type Selection = "create" | "read" | "update&delete" | "search";

interface BaseProps {
  title: string;
}

export interface CreateProps<T> extends BaseProps {
  submit: (value: T) => Promise<void>;
}

export interface UpdateDeleteProps<T, K extends Omit<T, any>>
  extends BaseProps {
  submit: (value: K) => Promise<void>;
  getter: (id: string) => Promise<T>;
}

export interface ReadProps<T> extends BaseProps {
  getter: (id: string) => Promise<T>;
}

export interface SearchProps<T> extends BaseProps {
  submit: (query: string) => Promise<T[]>;
  toResult: (value: T) => LookupbarResult;
  add: string;
}

export interface FormProps {
  questions: FormRelation<any>;
}

export type MapToInt<T> = { [K in keyof T]: number };
