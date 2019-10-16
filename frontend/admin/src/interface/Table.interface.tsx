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
}

export type TableItem = (string | number | boolean | JSX.Element);

export interface TableUIProps extends TableProps {
  add?: TableAdd;
  select?: TableSelect;
}

export interface TableAdd extends ModalAction {
  new: (items: TableItem[]) => void;
}

export interface TableSelect {
  toggleSelect: (index: number) => void;
  toggleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: Number[];
}

export interface TableState {
  items: TableItem[][];
  add: boolean;
  selected: Number[];
}