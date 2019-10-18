export interface AlertProps {
  message: string;
  theme: "primary" | "secondary" | "success" | "danger" | "warning" | "light" | "dark" | "info";
  dismissable?: boolean;
}