export interface AlertDOT {
  msg: string;
  type: string;
}

export enum AlertType {
  SERVER = "SERVER",
  DATABASE = "DATABASE",
  ADMIN = "ADMIN",
  PAYPAL = "PAYPAL",
  GOOGLE = "GOOGLE"
}
