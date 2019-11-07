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
interface test {
  collection: string;
}
export class Order extends Model<Value, ExistingBody> implements test {
  protected static collection = "order";
  constructor(order: Constructor | string) {
    if (typeof order === "string") {
      super(order);
    } else {
      this.setState({
        ...this.state(),
        ...order,
        cancelled: false,
        complete: false,
        cost: this.setTotalCost(order.cart.getProducts())
      });
    }
  }
  private setTotalCost(products: ProductVariation[]): Money {
    return products.reduce(
      (prev, cur) => prev.add(cur.getCost()),
      new Money(0)
    );
  }
  public complete(): void {
    this.setState({
      ...this.state(),
      cancelled: true
    });
  }
  public getID(): string {
    return this.state().id;
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
    return this.state().shipping;
  }
  public getProducts(): ProductVariation[] {
    return this.state().cart.getProducts();
  }
  public getTotalCost(): Money {
    return this.state().cost;
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
  public fromPrimObj(struct: ExistingBody): Value {}
  public static search(query: Partial<SearchQuery>): Order[] {}
}

export default Order;
