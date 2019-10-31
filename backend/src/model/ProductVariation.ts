import {
  Constructor,
  NewBody,
  ExistingBody,
  SearchQuery
} from '../interface/ProductVariation.interface';
import uuid = require('uuid/v4');
import Money from '../type/Money';
import Color from '../type/Color';

export class ProductVariation {
  private _values: Constructor;
  constructor(product: Constructor) {
    this._values = product;
  }
  public static generate(product: NewBody): ProductVariation {
    const cProduct: Constructor = {
      ...product,
      id: uuid(),
      images: product.images.map(cur => new URL(cur)),
      price: new Money(product.price),
      color: product.color ? new Color(product.color) : undefined
    };
    return new ProductVariation(cProduct);
  }
  public toPrimObj(): ExistingBody {
    const product: ExistingBody = {
      ...this._values,
      price: this._values.price.getValue(),
      color: this._values.color ? this._values.color.toString() : undefined,
      images: this._values.images.map(cur => cur.toJSON())
    };
    return product;
  }
  public getCost(): Money {
    return this._values.price;
  }
  public save(): void {
    // Database Method
  }
  public delete(): void {
    // Database Method
  }
  public update(): void {
    // Database Method
  }
  public static search(query: Partial<SearchQuery>): ProductVariation[] {}
}

export default ProductVariation;
