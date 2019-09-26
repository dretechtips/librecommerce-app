import { CartConstructor, NewCartBody, ExistingCartBody } from "../interface/Cart.interface";
import uuid = require('uuid/v4');
import { Product } from "./Inventory";
import { Time } from "../type/Time";

export class CartSession
{
  private _value: Map<string, Cart>;
  private _timeout: Time;
  constructor()
  {
    this._timeout = new Time(7, "d");
    this._timeout.toMilliSeconds();
  }
  public add(cart: Cart)
  {
    this._value.set(cart.getID(), cart);
    setTimeout(() => this.remove(cart.getID()), this._timeout.getAmount())
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
  public getAll(): Cart[]
  {
    return Array.from(this._value.values());
  }
}

export class Cart
{
  private _value: CartConstructor;
  constructor(products: Product[])
  {
    this._value = {
      items: products,
      id: uuid(),
    }
  }
  public getProducts(): Product[]
  {
    return this._value.items;
  }
  public getID(): string {
    return this._value.id;
  }
  public static generate(body: NewCartBody): Cart
  {
    const cart: CartConstructor =
    {
      items: body.items.map(cur => Product.From.id(cur)),
      id: uuid(),
    }
    return new Cart(cart);
  }
  public toPrimObj(): CartBody {
    const cart: CartBody = {
      items: this._value.items.map(cur => cur.toPrimitiveObj()),
      id: this._value.id,
    }
    return cart;
  }
}