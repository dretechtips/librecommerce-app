import { default as Database } from "../model/Database";
import {  ProductConstructor, NewProductBody, ExistingProductBody, InventoryCategory } from "../interface/Inventory.interface";
import uuid = require("uuid/v4");
import { Money } from "../type/Money";
import { Color } from "../type/Color";

export class Inventory
{
  private _products: Map<string, Product>;
  constructor(productID: string[])
  {
    
  }
  public add(product: Product)
  {
  
  }
  public remove(id: string)
  {
    this._products.delete(id);
  }
  // Grab the hottest product and newest product
  public refresh()
  {
    this._products.clear();
    // DB Query
    // Populate The Hash Map
  }
  public static fetchCategories(): InventoryCategory[]
  {
    // Database method
  }
  find(id: string): Product
  {
    return this._products.get(id);
  }
}

export class Product
{
  private _values: ProductConstructor;
  constructor(product: ProductConstructor)
  {
    
  }
  public add()
  {
    
  }
  public remove()
  {
    // find within database
    // find within memory 
  }
  public getValue(): ProductConstructor
  {
    return this._values;
  }
  public save()
  {
    // save into database
    // save into inventory if it was is memory
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
  public static From = class
  {
    public static id(id: string): Product
    {
      
    }
    public static price(min: number, max: number): Product[]
    {
      
    }
    
  }
}