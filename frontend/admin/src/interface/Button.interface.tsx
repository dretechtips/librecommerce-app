export interface ButtonProps {
  value: string;
  color: ButtonColor;
  action: (...args: any[]) => any;
  icon?: string;
  actionArgs?: any[];
  hasOutline?: boolean;
  size?: "sm" | "lg";
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export type ButtonColor = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "link"