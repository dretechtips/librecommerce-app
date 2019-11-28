import React from "react";
import { ButtonProps } from "./Button.interface";

export interface ButtonGroupProps {
  children?:
    | React.ReactElement<ButtonProps>[]
    | React.ReactElement<ButtonProps>;
  size?: "sm" | "lg";
  vertical?: boolean;
  className?: string;
}
