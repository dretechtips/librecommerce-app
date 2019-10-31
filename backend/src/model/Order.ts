import {
  Constructor,
  NewBody,
  ExistingBody,
  Value,
  OrderProduct,
  SearchQuery
} from '../interface/Order.interface';
import { Queue } from '../data/Queue';
import * as uuid from 'uuid/v4';
import { EmailAddress, PhoneNum, Address, IPAddress } from '../type/Location';
import Customer from './Customer';
import { ICustomer } from '../interface/Customer.interface';
import { Shipping } from './Shipping';
import axios = require('axios');
import { Request } from 'express-serve-static-core';
import { Money } from '../type/Money';
import { IShipping } from '../interface/Shipping.interface';
import ProductVariation from './ProductVariation';

export class Order {
  private _value: Value;
  constructor(order: Constructor) {
    this._value = {
      ...order
    };
    this._value.shipping.setID(this._value.id);
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
  public save(): void {
    // Add Into Database
  }
  public refund(): void {
    // Talk to paypal api // Paypal API refund
    // note it into the database
  }
  public addProduct(): void {}
  public getShipping(): Shipping {
    return this._value.shipping;
  }
  public getProducts(): OrderProduct[] {
    return this._value.products;
  }
  public getTotalCost(): Money {
    return this._value.cost;
  }
  public delete(): boolean {
    // Database Method
    // Create
  }
  public cancel(): void {
    this._value.cancelled = true;
  }
  public update(body: any): void {
    const value = this._value;
    if (body.products) value.products = body.products;
    if (body.address) value.address = body.address;
  }
  public static generate(body: NewBody, req: Request): Order {
    const customers: Customer[] = Customer.search({ id: body.customerID });
    const customer: Customer = customers[0];
    const products: ProductVariation[] = body.products.reduce(
      (prev, cur) => ProductVariation.search({ id: cur.id }).concat(prev),
      [] as ProductVariation[]
    );
    const order: Constructor = {
      id: uuid(),
      timestamp: new Date(),
      address: customer.getAddress(),
      cancelled: false,
      shipping: Shipping.generate(body.shipping),
      ipAddress: IPAddress.generate(req),
      products: body.products,
      cost: new Money(
        products.reduce((prev, cur) => prev + cur.getCost().getValue(), 0)
      ),
      complete: false
    };
    return new Order(order);
  }
  public toPrimObj(): ExistingBody {
    const shipping: ShippingConstructor = this._value.shipping.getValue();
    const order: ExistingBody = {
      ...this._value,
      timestamp: this._value.timestamp.toDateString(),
      ipAddress: this._value.ipAddress.toString(),
      totalCost: this._value.cost.getValue(),
      shipping: {
        ...shipping,
        price: shipping.price.getValue(),
        orderID: shipping.orderID,
        cancelled: shipping.cancelled
      },
      address: this._value.address.getValue(),
      email: this._value.email.toString(),
      phone: this._value.phone.toString()
    };
    return order;
  }
  public static search(query: Partial<SearchQuery>): Order[] {}
}

export default Order;
