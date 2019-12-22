import { Component } from "react";
import { ButtonProps } from "./Button.interface";

export interface SearchbarProps {
  placeholder: string;
  search: (value: string) => void;
  value?: string;
  buttons?: SearchButton[];
}

export interface SearchFunction {
  (value: string): void;
}

export interface SearchButton {
  icon: string;
  text?: string;
  action: (...args: any) => any;
}
