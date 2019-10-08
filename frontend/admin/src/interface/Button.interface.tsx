export interface ButtonProps {
  value: string;
  color: ButtonColor;
  action: Function;
  actionArgs: any[];
  hasOutline: boolean;
  size?: "sm" | "lg";
  active: boolean;
  disabled: boolean;
}

export type ButtonColor = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "link"