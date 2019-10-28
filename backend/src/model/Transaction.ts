import { Constructor, Body } from "../interface/Transaction.interface";
import { Order } from "./Order";

export class Transaction {
  private _value: Constructor;
  constructor(transaction: Constructor) {
    this._value = transaction;
  }
  public save() {

  }
  public delete() {

  }
  private deleteFromDatabase() {

  }
  public refund() {

  }
  public toString(): string {
    return "[Order: " + this._value.orderID + "\n"
      + "Order Shipping: " + this._value.shippingID + "\n"
      + "Timestamp: " + this._value.timestamp + "]\n";
  }
  public orderID() {
    return this._value.orderID;
  }
  public toPrimObj(): Body {
    const trans: Body =
    {
      ipAddress: this._value.ipAddress.toString(),
      orderID: this._value.orderID,
      shippingID: this._value.shippingID,
      transactionID: this._value.transactionID
    }
    return trans;
  }
  public static from = class {
    public static id(id: string): Transaction | null {

    }
    public static order(order: Order): Transaction | null {
      const orderVal: OrderConstructor = order.getValue();
      const trans: TransactionConstructor = {
        shippingID: orderVal.shipping.getValue().shippingID,
        ipAddress: orderVal.ipAddress,
        orderID: orderVal.id,
        transactionID: uuid()
      }
      return new Transaction(trans);
    }
    public static date(date: Date): Transaction | null {

    }
  }
}

export default Transaction;