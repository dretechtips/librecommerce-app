import { default as Database } from "./Database";
import { OrderConstructor, NewOrderBody } from "../interface/Order.interface";
import { DatabaseKeyValue, DatabaseQueryConstructor } from "../interface/Database.interface";
import { Queue } from "../data/Queue";
import * as uuid from "uuid/v4";
import {  EmailAddress, PhoneNum, Address  } from "./Location";
import { Customer } from "./Customer";
import { CustomerConstructor } from "../interface/Customer.interface";
import { Shipping } from "./Shipping";

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
  save()
  {
    // Add Into Database
  }
  public getValue()
  {
    return this._value;
  }
  public getShipping(): Shipping
  {
    return this._value.shipping;
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
    if(body.productsID) value.productsID = body.productsID;
    if(body.address) value.address = body.address;
    if(body.email) value.email = body.email;
    if(body.phone) value.phone = body.phone
  }
  public static generate(body: NewOrderBody): Order
  {
    if(body.username)
    {
      const customer: CustomerConstructor = Customer.From.username(body.username).getValue();
      const order: OrderConstructor = 
      {
        id: uuid(),
        username: customer.username,
        timestamp: new Date(),
        productsID: body.productsID,
        address: customer.address,
        email: customer.email,
        phone: customer.phone,
        cancelled: false,
        shipping: Shipping.generate(body.shipping),
      }
      return new Order(order);
    }
    else
    {
      const order: OrderConstructor = 
      {
        id: uuid(),
        timestamp: new Date(),
        productsID: body.productsID,
        address: new Address(body.address),
        email: new EmailAddress(body.email),
        phone: new PhoneNum(body.phone),
        shipping: Shipping.generate(body.shipping),
        cancelled: false,
      }
      return new Order(order);
    }
  }
  public static From = class
  {
    public static id(id: string): Order
    {
      
    }
  }
}