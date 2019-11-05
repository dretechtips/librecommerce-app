import {
  Constructor,
  NewBody,
  ExistingBody,
  Provider,
  SearchQuery,
  Value
} from '../interface/Shipping.interface';
import { Queue } from '../data/Queue';
import { Order } from './Order';
import { Money } from '../type/Money';
import uuid = require('uuid/v4');

export class ShippingQueue extends Queue<Shipping> {}

export class Shipping {
  private _values: Value;
  constructor(shipping: Constructor) {
    this._values = {
      ...shipping,
      id: uuid(),
      cancelled: false,
      price: new Money(0)
    };
  }
  public static search(query: Partial<SearchQuery>): Shipping[] {}
  public save(): void {
    // Database Method
  }
  public delete(): void {
    // Database Method
  }
  public update(body: Pick<ExistingBody, 'cancelled'>): void {
    // Database Method
  }
  public isNext(): boolean {
    // database method
  }
  public setID(id: string): void {
    this._values.orderID = id;
  }
  public getID(): string {
    return this._values.orderID;
  }
  public getValue() {
    return this._values;
  }
  public complete(): void {}
  public static generate(body: NewBody): Shipping {
    const shipping: Constructor = {
      shippingID: uuid(),
      days: body.days,
      price: new Money(body.price),
      provider: body.provider,
      cancelled: false,
      orderID: body.orderID
    };
    return new Shipping(shipping);
  }
  public toPrimObj(): ExistingBody {
    const obj: ExistingBody = {
      ...this._values,
      price: this._values.price.getValue()
    };
    return obj;
  }
}

export default Shipping;
