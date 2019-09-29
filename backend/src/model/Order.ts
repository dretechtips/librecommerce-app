import { default as Database } from "./Database";
import { IOrder } from "../interface/Order.interface";
import { DatabaseKeyValue, DatabaseQueryConstructor } from "../interface/Database.interface";
import { Queue } from "../data/Queue";
import * as uuid from "uuid/v4";
import {  EmailAddress, PhoneNum, Address, IPAddress  } from "../type/Location";
import { Customer, CustomerManager } from "./Customer";
import { ICustomer } from "../interface/Customer.interface";
import { Shipping } from "./Shipping";
import axios = require("axios");
import { Request } from "express-serve-static-core"
import { Money } from "../type/Money";
import { IShipping } from "../interface/Shipping.interface";
import { ProductVariationArray } from "./Inventory";

export class OrderQueue extends Queue<Order>
{
  private _hold: Map<string, Order>;
  constructor(vals?: Order[])
  {
    super(vals);
  }
  public getAllOrders(): Order[] {
    return this._values;
  }
  public enqueue(order: Order): void
  {
    this._values.push(order);
  }
  public dequeue(): Order
  {
    const val: Order = this._values.shift();
    return val;
  }
  public getNext(): Order
  {
    return this._values[1];
  }
  public getNextOrderID(): string
  {
    return this.getNext().getValue().id;
  }
  public hold(): void
  {
    const order: Order = this._values.shift();
    this._hold.set(order.getValue().id, order);
  }
  public unhold(id: string): boolean
  {
    const order: Order = this._hold.get(id);
    if(order === undefined)
      return false;
    else 
      return true;
  }
  public getHoldList(): Order[]
  {
    const orders: Order[] = Array.from(this._hold.values());
    return orders;
  }
}

export class Order
{
  private _value: IOrder.Constructor;
  constructor(order: IOrder.Constructor)
  {
    this._value = order;
    this._value.shipping.setID(this._value.id);
  }
  public complete() {
    this._value.complete = true;
  }
  public getID(): string {
    return this._value.id;
  }
  public transact()
  {
    // Talk to paypal api
    
  }
  public async save()
  {
    // Add Into Database
  }
  public refund()
  {
    // Talk to paypal api // Paypal API refund
    // note it into the database
  }
  public getValue()
  {
    return this._value;
  }
  public getShipping(): Shipping
  {
    return this._value.shipping;
  }
  public getProducts(): OrderProduct[]
  {
    return this._value.products;
  }
  public getTotalPay(): Money
  {
    return this._value.totalPay;
  }
  public delete(): boolean
  {

  }
  public cancel()
  {
    this._value.cancelled = true;
  }
  public update(body: any)
  {
    const value = this._value;
    if(body.products) value.products = body.products;
    if (body.address) value.address = body.address;
  }
  public static generate(body: IOrder.NewBody, req: Request): Order
  {
    const customer: Customer | null = CustomerManager.from.id(body.id) as Customer;
    const order: IOrder.Constructor = 
    {
      id: uuid(),
      timestamp: new Date(),
      address: customer.getAddress(),
      cancelled: false,
      shipping: Shipping.generate(body.shipping),
      ipAddress: IPAddress.generate(req),
      products: body.products,
      cost: new ProductVariationArray(body.products).getTotalCost(),
      complete: false,
    }
    return new Order(order);
  }
  public toPrimObj(): ExistingOrderBody
  {
    const shipping: ShippingConstructor = this._value.shipping.getValue();
    const order: ExistingOrderBody = {
      ...this._value,
      timestamp: this._value.timestamp.toDateString(),
      ipAddress: this._value.ipAddress.toString(),
      totalPay: this._value.totalPay.getValue(),
      shipping: {
        ...shipping,
        price: shipping.price.getValue(),
        orderID: shipping.orderID,
        cancelled: shipping.cancelled,
      },
      address: this._value.address.getValue(),
      email: this._value.email.toString(),
      phone: this._value.phone.toString(),
    }
    return order;
  }
  public static From = class
  {
    public static body(body: any): Order[]
    {
      
    }
    public static id(id: string): Order
    {
      
    }
  }
}