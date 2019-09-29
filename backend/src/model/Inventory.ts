import { default as Database } from "../model/Database";
import { IProduct, IProductVariation, ICategory, ISearchQuery } from "../interface/Inventory.interface";
import uuid = require("uuid/v4");
import { Money } from "../type/Money";
import { Color, color } from "../type/Color";
import { Paypal } from "./Paypal";
import cron = require('node-cron');

export class InventoryManager {
  public static import(): Inventory {
    // Database Method
  }
}

export class Inventory
{
  private _products: Map<string, Product>;
  private _categories: Map<string, Category>;
  constructor(productsID?: string[], categoriesID?: string[])
  {
    this._products = new Map();
    this._categories = new Map();
    if (productsID) {
      productsID.forEach(cur => {
        const product: Product | null = ProductManager.from.id(cur);
        if(product)
          this._products.set(cur, product);
      });
    }
    if (categoriesID) {
      categoriesID.forEach(cur => {
        const category: Category = Category.import(cur);
        this._categories.set(cur, category);
      })
    }
  }
  private setEvents(): void {
    cron.schedule("0 1 * * *", () => this.save());
    process.on("beforeExit", () => this.save());
  }
  public save(): void {
    // Database Method
  }
  public add(product: Product): void
  {
    this._products.set(product.getValue().id, product);
    product.save();
  }
  public remove(id: string): void
  {
    this._products.delete(id);
  }
  public getCategories(): Category[]
  {
    return Array.from(this._categories.values());
  }
  public addCategory(category: Category) {
    this._categories.set(category.getID(), category);
  }
  public find(id: string): Product | null
  {
    const product: Product | undefined = this._products.get(id);
    if (product === undefined)
      return null;
    else
      return product;
  }
  public list(limit: number): Product[] {
    return Array.from(this._products.values());
  }
}

export class Category {
  private _name: string;
  private _id: string;
  constructor(name: string, id: string) {
    this._name = name;
    this._id = id;
  }
  public static import(id: string): Category {
    // Database Method
  }
  public static importAll(): Category[] {
    // Database Method
  }
  public getID(): string {
    return this._id;
  }
  public toPrimObj(): ICategory.Body {
    const obj: ICategory.Body = {
      name: this._name,
      id: this._id,
    }
    return obj;
  }
}

export class ProductManager {
  public static from = class {
    public static queries(body: ProductSearchQuery): Product[] | null {
      // Database Method
    }
    public static id(id: string): Product | null {
      // Database Method
    }
    public static price(min: number, max: number): Product[] | null {
      // Database Method
    }
  }
}

export class ProductVariationManager {
  public static from = class {

  }
}

export class ProductVariationArray extends Array<ProductVariation> {
  constructor(products: ProductVariation[]) {
    super(products.length);
  }
  public getTotalCost(): Money {
    let price: Money = new Money(0.00);
    for (let i = 0; i < this.length; i++) {
      const cur: Money = this[i].getCost();
      price = price.add(cur);
    }
    return price;
  }
}

export class Product
{
  private _values: IProduct.Constructor;
  constructor(product: IProduct.Constructor)
  {
    this._values = product;
  }
  public add()
  {
    // Database Method
  }
  public remove()
  {
    // Database Method
  }
  public save()
  {
    // Database Method
  }
  public getVariations(): ProductVariation[] {
    // Database Method
  }
  public getValue(): IProduct.Constructor
  {
    return this._values;
  }
  public getID(): string {
    return this._values.id;
  }
  public update(body: any)
  {
    const value = this._values;
    if(body.name) value.name = body.name;
    if(body.categoryID) value.categoryID = body.categoryID;
    if(body.description) value.description = body.description;
    if(body.warning) value.warning = body.warning;
    if(body.ingredients) value.ingredients = body.ingredients;
    if(body.benefits) value.benefits = body.benefits;
    if(body.brand) value.brand = body.brand;
  }
  public static generate(body: IProduct.NewBody): Product
  {
    const product: IProduct.Constructor = 
    {
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
    }
    return new Product(product);
  }
  public toPrimitiveObj(): IProduct.ExistingBody
  {
    const product: IProduct.ExistingBody = {
      ...this._values,
    }
    return product;
  }
}

export class ProductVariation {
  private _values: IProductVariation.Constructor;
  constructor(product: IProductVariation.Constructor) {
    this._values = product;
  }
  public static generate(product: IProductVariation.NewBody): ProductVariation {
    const cProduct: IProductVariation.Constructor = {
      ...product,
      id: uuid(),
      images: product.images.map(cur => new URL(cur)),
      price: new Money(product.price),
      color: product.color ? new Color(product.color) : undefined,
    }
    return new ProductVariation(cProduct);
  }
  public toPrimObj(): IProductVariation.ExistingBody {
    const product: IProductVariation.ExistingBody = {
      ...this._values,
      price: this._values.price.getValue(),
      color: this._values.color ? this._values.color.toString() : undefined,
      images: this._values.images.map(cur => cur.toJSON())
    }
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
}