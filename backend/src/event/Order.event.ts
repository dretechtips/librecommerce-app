import events = require("events");
import { Order } from "../model/Order";

export class OrderEvent extends events.EventEmitter {
  private _ADD: symbol;
  constructor() {
    super();
    this._ADD = Symbol("ADD");
  }
  public add(order: Order) {
    this.emit(this._ADD, [order]);
  }
  public getAdd() {
    return this._ADD;
  }
}