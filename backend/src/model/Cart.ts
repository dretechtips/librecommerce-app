import {
  Constructor,
  NewBody,
  ExistingBody,
  Value
} from '../interface/Cart.interface';
import uuid = require('uuid/v4');
import ProductVariation from './ProductVariation';
import { Time } from '../type/Time';

export class Cart {
  private _value: Value;
  constructor(value: Constructor) {
    this._value = {
      ...value,
      id: uuid()
    };
  }
  public getProducts(): ProductVariation[] {
    return this._value.items;
  }
  public addProduct(product: ProductVariation): void {
    this._value.items.push(product);
    return;
  }
  public removeProduct(productID: string): void {
    this._value.items.filter(cur => productID !== cur.getID());
  }
  public id(): string {
    return this._value.id;
  }
  public static generate(body: NewBody): Cart {
    const cart: Constructor = {
      items: body.items
        .map(cur => Product.search({ id: cur }))
        .reduce((prev, cur) => prev.concat(cur))
    };
    return new Cart(cart);
  }
  public toPrimObj(): ExistingBody {
    const cart: ExistingBody = {
      items: this._value.items.map(cur => cur.toPrimitiveObj()),
      id: this._value.id
    };
    return cart;
  }
}

export default Cart;
