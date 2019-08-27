import { default as Database } from "../model/Database";
import { Product } from "../interface/Inventory.interface";
import { default as url } from "url";

export class Inventory
{
  public static async add(item: Product): Promise<boolean>
  {
    const query = `INSERT INTO products (name, id, category_id, price, images, sizes, description, brand, rating, rating_amount, stock, directions, warning, ingredients, benefits,) VALUES ('${item.name}', '${item.id}', '${item.categoryID}', ${item.price}, ${Database.arrayToSqlArray(item.images.map(cur => url.format(cur)))}, ${Database.arrayToSqlArray(item.sizes)}), '${item.description}', '${item.brand}', 5.0, 0, true, ${Database.arrayToSqlArray(item.directions)}, ${item.warning ? item.warning : ''}, '${db.class.arrayToSqlArray(item.ingredients)}', '${db.class.arrayToSqlArray(item.benefits)}'`;
    Database._db.main.singleQuery(query);
  }
  public static async remove(itemID: string): Promise<boolean>
  {
    const query = `DELETE FROM products WHERE id = ${itemID}`;
    database.main.singleQuery(query);
  }
  public static async update(itemID: string, item: Product): Promise<boolean>
  {
    database.main.singleQuery();
  }
}