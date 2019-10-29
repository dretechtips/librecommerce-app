import {
  Constructor,
  NewBody,
  ExistingBody,
  SearchQuery
} from '../interface/Product.interface';
import uuid = require('uuid/v4');

export class Product {
  private _values: Constructor;
  constructor(product: Constructor) {
    this._values = product;
  }
  public add(): void {
    // Database Method
  }
  public remove(): void {
    // Database Method
  }
  public save(): void {
    // Database Method
  }
  public static search(query: Partial<SearchQuery>): Product[] {}
  public getValue(): Constructor {
    return this._values;
  }
  public getID(): string {
    return this._values.id;
  }
  public update(body: Partial<ExistingBody>) {
    this._values = { ...this._values, ...body };
  }
  public static generate(body: NewBody): Product {
    const product: Constructor = {
      name: body.name,
      id: uuid(),
      categoryID: body.categoryID,
      description: body.description,
      directions: body.directions,
      warning: body.warning,
      ingredients: body.ingredients,
      benefits: body.benefits,
      brand: body.brand,
      rating: 5.0,
      ratingAmount: 0
    };
    return new Product(product);
  }
  public toPrimitiveObj(): ExistingBody {
    const product: ExistingBody = {
      ...this._values
    };
    return product;
  }
}

export default Product;
