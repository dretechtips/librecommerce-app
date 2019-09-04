import { default as Database } from "../model/Database";
import {  ProductConstructor } from "../interface/Inventory.interface";
import { default as url } from "url";

export class Inventory
{
//   public static async add(item: Product): Promise<boolean>
//   {
//     const query = `INSERT INTO products (name, id, category_id, price, images, sizes, description, brand, rating, rating_amount, stock, directions, warning, ingredients, benefits,) VALUES ('${item.name}', '${item.id}', '${item.categoryID}', ${item.price}, ${Database.arrayToSqlArray(item.images.map(cur => url.format(cur)))}, ${Database.arrayToSqlArray(item.sizes)}), '${item.description}', '${item.brand}', 5.0, 0, true, ${Database.arrayToSqlArray(item.directions)}, ${item.warning ? item.warning : ''}, '${db.class.arrayToSqlArray(item.ingredients)}', '${db.class.arrayToSqlArray(item.benefits)}'`;
//     Database._db.main.singleQuery(query);
//   }
//   public static async remove(itemID: string): Promise<boolean>
//   {
//     const query = `DELETE FROM products WHERE id = ${itemID}`;
//     database.main.singleQuery(query);
//   }
//   public static async update(itemID: string, item: Product): Promise<boolean>
//   {
//     database.main.singleQuery();
//   }
  private _products: Map<string, Product>;
  constructor(productID: string[])
  {
    
  }
  add(product: Product)
  {
  
  }
  // Grab the hottest product and newest product
  refresh()
  {
    this._products.clear();
    // DB Query
    // Populate The Hash Map
  }
  get(id: string): Product
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
  public static From = class
  {
    public static id()
    {
      
    }
  }
}