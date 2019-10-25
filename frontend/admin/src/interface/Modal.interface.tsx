import React, { MutableRefObject, RefObject } from "react";

export interface ModalProps {
  title: string;
  body: JSX.Element;
  footer?: JSX.Element[];
  display?: boolean;
  toggle: () => void;
}

export interface ModalAction {
  button: boolean;
  modal: boolean;
  toggle: () => void;
}
