import { CartConstructor, NewCartBody } from "../interface/Cart.interface";
import uuid = require('uuid/v4');
import { Product } from "./Inventory";
import schedule = require('node-schedule');

export class CartSession
{
  private _value: Map<string, Cart>;
  private _dateLeft: number = 7;
  constructor()
  {
    
  }
  public add(cart: Cart)
  {
    this._value.set(cart.getValue().id, cart);
    let scheduleDate: Date = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + this._dateLeft);
    schedule.scheduleJob(scheduleDate, () => this.remove(cart.getValue().id));
  }
  public remove(id: string)
  {
    if(this._value.has(id))
      this._value.delete(id);
  }
  public length(): number
  {
    return this._value.entries.length;
  }
  public find(id: string): Cart
  {
    return this._value.get(id);
  }
  public update(id: string, cart: Cart)
  {
    this._value.delete(id);
    this._value.set(id, cart);
  }
  public findAll(): Cart[]
  {
    return Array.from(this._value.values());
  }
}

export class Cart
{
  private _value: CartConstructor;
  constructor(cart: CartConstructor)
  {
    this._value = cart;
    if(!this._value.id) this._value.id = uuid();
  }
  public getValue(): CartConstructor
  {
    return this._value;
  }
  public static generate(body: NewCartBody)
  {
    const cart: CartConstructor =
    {
      items: body.items.map(cur => Product.From.id(cur)),
      id: uuid(),
    }
    return new Cart(cart);
  }
}