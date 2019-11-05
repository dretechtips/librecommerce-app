import {
  Constructor,
  NewBody,
  ExistingBody,
  Value,
  SearchQuery
} from "../interface/Order.interface";
import { Queue } from "../data/Queue";
import * as uuid from "uuid/v4";
import { EmailAddress, PhoneNum, Address, IPAddress } from "../type/Location";
import Customer from "./Customer";
import * as ICustomer from "../interface/Customer.interface";
import { Shipping } from "./Shipping";
import axios = require("axios");
import { Request } from "express-serve-static-core";
import { Money } from "../type/Money";
import * as IShipping from "../interface/Shipping.interface";
import ProductVariation from "./ProductVariation";
import Model from "./Model";

export class Order extends Model<
  Value,
  ExistingBody,
  Pick<ExistingBody, "cancelled" | "cart">
> {
  constructor(order: Constructor | string) {
    super("order");
    this._value = {
      ...order,
      id: uuid(),
      timestamp: new Date(),
      cancelled: false,
      complete: false,
      cost: this.setTotalCost(order.products)
    };
    this._value.shipping.setID(this._value.id);
  }
  private setTotalCost(products: ProductVariation[]): Money {
    return products.reduce(
      (prev, cur) => prev.add(cur.getCost()),
      new Money(0)
    );
  }
  public complete(): void {
    this._value.complete = true;
  }
  public getID(): string {
    return this._value.id;
  }
  public transact(): void {
    // Talk to paypal api
  }
  public refund(): void {
    // Talk to paypal api // Paypal API refund
    // note it into the database
  }
  public addProduct(): void {}
  public getShipping(): Shipping {
    return this._value.shipping;
  }
  public getProducts(): ProductVariation[] {
    return this._value.products;
  }
  public getTotalCost(): Money {
    return this._value.cost;
  }
  public cancel(): void {
    this.update({ cancelled: true });
  }
  public hold(): void {}
  public unhold(): void {}
  public isHeld(): boolean {
    // Return hold status
  }
  public toPrimObj(): ExistingBody {}
  public static search(query: Partial<SearchQuery>): Order[] {}
}

export default Order;
