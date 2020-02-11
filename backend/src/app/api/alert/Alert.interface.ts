export interface AlertDOT {
  msg: string;
  type: AlertType;
}

export enum AlertType {
  SERVER,
  DATABASE,
  ADMIN,
  PAYPAL,
  GOOGLE
}

export interface AlertContainer {
  alertIDs: string[];
}
