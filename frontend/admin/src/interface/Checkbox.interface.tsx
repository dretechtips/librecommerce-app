import React from "react";
import Checkbox from "../components/Checkbox";

export type CheckboxUIProps = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
