import { IPAddress, EmailAddress } from "../type/Location";

export interface Constructor {
  ipAddress: IPAddress,
  orderID: string,
  shippingID: string,
  transactionID: string,
  timestamp: Date,
}

export interface Body {
  ipAddress: string,
  orderID: string,
  shippingID: string,
  transactionID: string,
}
