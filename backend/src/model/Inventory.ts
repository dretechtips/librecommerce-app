import { default as Database } from "../model/Database";
import {  ProductConstructor, NewProductBody, ExistingProductBody, InventoryCategory, ProductSearchQuery, CategoryBody } from "../interface/Inventory.interface";
import uuid = require("uuid/v4");
import { Money } from "../type/Money";
import { Color } from "../type/Color";
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
        const product: Product | null = Product.From.id(cur);
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
  public toPrimObj(): CategoryBody {
    const obj: CategoryBody = {
      name: this._name,
      id: this._id,
    }
    return obj;
  }
}

export class ProductManager {
  public static from = class {
    public static queries(body: ProductSearchQuery): Product[] | null {

    }
    public static id(id: string): Product | null {

    }
    public static price(min: number, max: number): Product[] | null {

    }
  }s
}

export class Product
{
  private _values: ProductConstructor;
  constructor(product: ProductConstructor)
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
    // Datbase Method
  }
  public getValue(): ProductConstructor
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
    if(body.price) value.price = new Money(body.price);
    // images
    if(body.colors) value.colors = body.colors.map(cur => new Color(cur));
    if(body.description) value.description = body.description;
    if(body.stock) value.stock = body.stock;
    if(body.warning) value.warning = body.warning;
    if(body.ingredients) value.ingredients = body.ingredients;
    if(body.benefits) value.benefits = body.benefits;
    if(body.brand) value.brand = body.brand;
  }
  public static generate(body: NewProductBody): Product
  {
    const product: ProductConstructor = 
    {
      name: body.name,
      id: uuid(),
      categoryID: body.categoryID,
      price: new Money(body.price),
      images: body.images.map(cur => new URL(cur)),
      sizes: body.sizes ? body.sizes : null,
      colors: body.colors ? body.colors.map(cur => new Color(cur)) : null,
      description: body.description,
      stock: body.stock,
      directions: body.directions ? body.directions : null,
      warning: body.warning ? body.warning : null,
      ingredients: body.ingredients ? body.ingredients : null,
      benefits: body.benefits ? body.benefits : null,
      brand: body.brand,
      rating: 5.0,
      ratingAmount: 0
    }
    return new Product(product);
  }
  public toPrimitiveObj(): ExistingProductBody
  {
    const product: ExistingProductBody = {
      ...this._values,
      price: this._values.price.getValue(),
      images: this._values.images.map(cur => String(cur)),
      colors: this._values.colors.map(cur => cur.toString()),
    }
    return product;
  }
}