import {
  Constructor,
  ExistingBody,
  Value,
  SearchQuery
} from '../interface/Order.interface';
import * as uuid from 'uuid/v4';
import { EmailAddress, PhoneNum, Address, IPAddress } from '../type/Location';
import Customer from './Customer';
import * as ICustomer from '../interface/Customer.interface';
import { Shipping } from './Shipping';
import axios = require('axios');
import { Money } from '../type/Money';
import * as IShipping from '../interface/Shipping.interface';
import ProductVariation from './ProductVariation';
import Model from './Model';

export class Order extends Model<Value, Required<ExistingBody>>() {
  public static database = 'main';
  public static collection = 'order';
  constructor(order: Constructor | string) {
    if (typeof order === 'string') {
      super(order);
    } else {
      super();
      this.setState({
        ...this.state(),
        ...order,
        cancelled: false,
        complete: false,
        cost: this.findTotalCost(order.cart.getProducts())
      });
    }
  }
  private findTotalCost(products: ProductVariation[]): Money {
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
    // Talk to paypal api
  }
  public addProduct(product: ProductVariation): void {
    this.state().cart.addProduct(product);
  }
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
  public hold(): void {
    this.setState({ ...this.state(), hold: true });
    return;
  }
  public unhold(): void {
    this.setState({ ...this.state(), hold: false });
    return;
  }
  public isHeld(): boolean {
    return this.state().hold;
  }
  public toPrimObj(): ExistingBody {}
  public fromPrimObj(struct: ExistingBody): Value {}
}

export default Order;
