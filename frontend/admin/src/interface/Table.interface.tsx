import Button from "../components/Button";
import React, { MutableRefObject } from "react";
import { ModalAction } from "./Modal.interface";

export interface TableProps {
  head: string[];
  items: TableItem[][];
  bordered?: boolean;
  stripped?: boolean;
  hover?: boolean;
  small?: boolean;
  allowAdd?: boolean;
  allowSelect?: boolean;
  allowDelete?: boolean;
}

export type TableItem = (string | number | boolean | JSX.Element);

export interface TableUIProps extends TableProps {
  add?: TableAdd;
  select?: TableSelect;
  delete?: TableDelete;
}

export interface TableAdd extends ModalAction {
  new: (items: TableItem[]) => void;
}

export interface TableSelect {
  toggleCheckbox: (index: number) => void;
  toggleCheckboxAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: number[];
  canSelect: boolean;
  toggleSelect: () => void;
}

export interface TableDelete {
  execute: () => void;
}

export interface TableState {
  items: TableItem[][];
  add: boolean;
  selected: number[];
  select: boolean;
}