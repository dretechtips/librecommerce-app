import { default as Database } from "./Database";
import { OrderConstructor, NewOrderBody, OrderProduct, ExistingOrderBody } from "../interface/Order.interface";
import { DatabaseKeyValue, DatabaseQueryConstructor } from "../interface/Database.interface";
import { Queue } from "../data/Queue";
import * as uuid from "uuid/v4";
import {  EmailAddress, PhoneNum, Address, IPAddress  } from "../type/Location";
import { Customer } from "./Customer";
import { CustomerConstructor } from "../interface/Customer.interface";
import { Shipping } from "./Shipping";
import axios = require("axios");
import { Request } from "express-serve-static-core"
import { Money } from "../type/Money";
import { ShippingConstructor } from "../interface/Shipping.interface";

export class OrdersQueue extends Queue
{
  private _hold: Map<string, Order>;
  constructor(vals: Order[])
  {
    super(vals);
  }
  public enqueue(order: Order)
  {
    this._values.push(order);
  }
  public dequeue(): Order
  {
    const val: Order = this._values.shift();
    val.save();
    return val;
  }
  public getNext(): Order
  {
    return this._values[this._values.length - 1];
  }
  public getNextOrderID(): string
  {
    return this.getNext().getValue().id;
  }
  public hold()
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
  private _value: OrderConstructor;
  private static _details: DatabaseQueryConstructor = {
    schema: "public",
    table: "orders",
    col: [""]
  }
  constructor(order: OrderConstructor)
  {
    this._value = order;
    this._value.shipping.setID(this._value.id);
  }
  public transact()
  {
    // Talk to paypal api
    
  }
  public save()
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
  private deleteFromDatabase(): boolean
  {
    
  }
  public cancel()
  {
    this._value.cancelled = true;
  }
  public update(body: any)
  {
    const value = this._value;
    if(body.username) value.username = body.username
    if(body.products) value.products = body.products;
    if(body.address) value.address = body.address;
    if(body.email) value.email = body.email;
    if(body.phone) value.phone = body.phone
  }
  public static generate(body: NewOrderBody, req: Request): Order
  {
    if(body.username)
    {
      const customer: CustomerConstructor = Customer.From.username(body.username).getValue();
      const order: OrderConstructor = 
      {
        id: uuid(),
        username: customer.username,
        timestamp: new Date(),
        address: customer.address,
        email: customer.email,
        phone: customer.phone,
        cancelled: false,
        shipping: Shipping.generate(body.shipping),
        ipAddress: IPAddress.generate(req),
        products: body.products,
        totalPay: new Money(6.6666666),
      }
      return new Order(order);
    }
    else
    {
      const order: OrderConstructor = 
      {
        id: uuid(),
        timestamp: new Date(),
        products: body.products,
        address: new Address(body.address),
        email: new EmailAddress(body.email),
        phone: new PhoneNum(body.phone),
        shipping: Shipping.generate(body.shipping),
        cancelled: false,
        ipAddress: IPAddress.generate(req),
        totalPay: new Money(6.666666)
      }
      return new Order(order);
    }
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