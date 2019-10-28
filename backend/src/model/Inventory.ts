import { default as Database } from "../model/Database";
import uuid = require("uuid/v4");
import { Money } from "../type/Money";
import { Color, color } from "../type/Color";
import { Paypal } from "./Paypal";
import cron = require('node-cron');
import Product from "./Product";
import Category from "./ProductCategory";


export class Inventory
{
  private _products: Map<string, Product>;
  private _categories: Map<string, ProductCategory>;
  public static fetch(): Inventory {
    // Database Method
  }
  constructor(productsID?: string[], categoriesID?: string[])
  {
    this._products = new Map();
    this._categories = new Map();
    if (productsID) {
      productsID.forEach(cur => {
        const product: Product | null = Product.search({id: cur})[0];
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

export default Inventory;