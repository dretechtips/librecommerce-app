import Time from "../type/Time";
import Cart from "./Cart";

export class CartSession {
  private _value: Map<string, Cart>;
  private _timeout: Time;
  constructor() {
    this._timeout = new Time(7, "d");
    this._timeout.toMilliSeconds();
  }
  public add(cart: Cart) {
    this._value.set(cart.getID(), cart);
    setTimeout(() => this.remove(cart.getID()), this._timeout.getAmount())
  }
  public remove(id: string) {
    if (this._value.has(id))
      this._value.delete(id);
  }
  public length(): number {
    return this._value.entries.length;
  }
  public find(id: string): Cart {
    return this._value.get(id);
  }
  public update(id: string, cart: Cart) {
    this._value.delete(id);
    this._value.set(id, cart);
  }
  public getAll(): Cart[] {
    return Array.from(this._value.values());
  }
}

export default CartSession;