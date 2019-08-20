const Database = require('./Database');

class Products
{
  static async add(item)
  {
    const query = `INSERT INTO products (name, id, category_id, price, images, sizes, description, brand, rating, rating_amount, stock, directions, warning, ingredients, benefits,) VALUES ('${item.name}', '${item.id}', '${item.categoryId}', ${item.price.toFixed(2)}, ${db.class.arrayToSqlArray(item.images)}, ${db.class.arrayToSqlArray(item.sizes)}), '${item.description}', '${item.brand}', 5.0, 0, true, ${db.class.arrayToSqlArray(item.directions)}, ${item.warning ? item.warning : ''}, '${db.class.arrayToSqlArray(item.ingredients)}', '${db.class.arrayToSqlArray(item.benefits)}'`;
    Database.all.main.singleQuery(query);
  }
  static async remove(itemID)
  {
    const query = `DELETE FROM products WHERE id = ${itemID}`;
    database.main.singleQuery(query);
  }
  static async update(itemID, itemObj)
  {
    database.main.singleQuery();
  }
}