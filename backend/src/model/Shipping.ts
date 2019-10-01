import { DatabaseQueryConstructor } from "../interface/Database.interface";
import { ShippingConstructor, NewShippingBody, ExistingShippingBody, ShippingProvider } from "../interface/Shipping.interface";
import { DatabaseQuery, Database } from "./Database";
import { Queue } from "../data/Queue";
import { Order } from "./Order";
import { Money } from "../type/Money";
import uuid = require("uuid/v4");

export class ShippingQueue extends Queue<Shipping> {  }

export class ShippingManager {
  public static from = class {
    public static id(id: string): Shipping | null {
      // Database Method
      return null;
    }
  }
}

export class Shipping
{
  private _values: ShippingConstructor;
  constructor(days: number, price: Money, provider: ShippingProvider, orderID: string)
  {
    this._values = {
      days: days,
      price: price,
      provider: provider,
      shippingID: uuid(),
      orderID: orderID,
      cancelled: false,
    }
  }
  public save(): void
  {
    // Database Method
  }
  public delete(): void {
    // Database Method
  }
  public update(body: any): void {
    // Database Method
  }
  public setID(id: string): void
  {
    this._values.orderID = id;
  }
  public getID(): string {
    return this._values.orderID;
  }
  public getValue()
  {
    return this._values;
  }
  public complete(): void {

  }
  public static generate(body: NewShippingBody): Shipping
  {
    const shipping: ShippingConstructor = 
    {
      shippingID: uuid(),
      days: body.days,
      price: new Money(body.price),
      provider: body.provider,
      cancelled: false,
      orderID: body.orderID,
    }
    return new Shipping(shipping);
  }
  public toPrimObj(): ExistingShippingBody {
    const obj: ExistingShippingBody =  {
      ...this._values,
      price: this._values.price.getValue(),
    }
    return obj;
  }
}