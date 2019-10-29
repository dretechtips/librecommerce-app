import {
  Constructor,
  Value,
  SearchQuery
} from '../interface/PromoCoupon.interface';
import uuid = require('uuid/v4');
import { DateRange } from '../type/Range';
import { Discount } from '../type/Discount';
import Promo from './Promo';
import Product from './Product';
import { NewBody } from '../interface/PromoCoupon.interface';

export class PromoCoupon {
  private _value: Value;
  constructor(coupon: Constructor) {
    this._value = {
      ...coupon,
      timestamp: new Date(),
      promos: this.convertToPromo(coupon.promos),
      id: uuid()
    };
  }
  private convertToPromo(products: Product[] | Promo[]): Promo[] {
    if (products[0] instanceof Product)
      return (products as Product[]).map(
        cur =>
          new Promo({
            discount: new Discount(0),
            range: new DateRange(new Date(), new Date()),
            productID: cur.getID()
          })
      );
    else if (products[0] instanceof Promo) return products as Promo[];
    else return [];
  }
  public setDiscountAll(discount: Discount | number): void {
    this._value.promos.forEach(cur => cur.setDiscount(discount));
  }
  public setDiscountEach(
    cb: (promo: Promo, index: number, self: Promo[]) => Discount
  ): void {
    for (let i = 0; i < this._value.promos.length; i++) {
      const cur: Promo = this._value.promos[i];
      cur.setDiscount(cb(cur, i, this._value.promos));
    }
  }
  public setDiscount(discount: Discount | number, index: number): void {
    this._value.promos[index].setDiscount(discount);
  }
  public static generate(body: NewBody): PromoCoupon {
    const coupon: Constructor = {
      name: body.name,
      range: new DateRange(new Date(body.startDate), new Date(body.endDate)),
      promos: body.productsID
        .map(cur => Product.search({ id: cur }))
        .reduce((x, y) => y.concat(x))
    };
    const promo: PromoCoupon = new PromoCoupon(coupon);
    promo.setDiscountAll(body.discount);
    return promo;
  }
  public add(): void {}
  public save(): void {}
  public delete(): void {}
  public update(coupon: Partial<PromoCoupon>): void {}
  public static search(value: Partial<SearchQuery>): PromoCoupon {}
}

export default PromoCoupon;
