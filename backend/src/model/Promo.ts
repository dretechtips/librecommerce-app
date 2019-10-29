import { Constructor, Value } from '../interface/Promo.interface';
import Product from './Product';
import { Discount } from '../type/Discount';

export class Promo {
  private _value: Value;
  constructor(promo: Constructor) {
    this._value = {
      ...promo,
      timestamp: new Date()
    };
  }
  public getDiscount(): Discount {
    return this._value.discount;
  }
  public getProduct(): Product {
    const id: string = this._value.productID;
    return Product.search({ id })[0];
  }
  public setDiscount(discount: Discount | number): void {
    if (typeof discount === 'number')
      this._value.discount = new Discount(discount);
    else this._value.discount = discount;
    return;
  }
}

export default Promo;
