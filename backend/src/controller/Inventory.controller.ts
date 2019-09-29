import { Request, Response, NextFunction } from "express";
import { Inventory, Product, InventoryManager, Category, ProductManager, ProductVariation } from "../model/Inventory";
import { Color } from "../type/Color";
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError } from "../model/Error";
import { IProduct, IProductVariation, ISearchQuery, ICategory } from "../interface/Inventory.interface";

export class InventoryController
{
  private static _inventory: Inventory = InventoryManager.import();
  @HttpMethod("POST", "The system was unable to add the product to the inventory.")
  public static add(req: Request, res: Response): void
  {

    const bProduct: IProduct.NewBody = req.body.product;
    const product: Product = Product.generate(bProduct);
    product.save();
  }
  @HttpMethod("POST", "System was unable to add the product to the base product.")
  public static addOnBase(req: Request, res: Response): void {
    const bProduct: IProductVariation.NewBody = req.body.product;
    if (!bProduct)
      throw new ClientError("Client didn't provide an product to add.");
    const product: ProductVariation = ProductVariation.generate(bProduct);
    product.save();
  }
  @HttpMethod("DELETE", "System was unable to delete the product in the inventory.")
  public static remove(req: Request, res: Response): void
  {
    const productID: string = req.body.product.id;
    const product: Product | null = ProductManager.from.id(productID);
    if (!product)
      throw new ClientError("Client didn't specify a valid id.");
    product.remove();
    if (this._inventory.find(product.getID())) {
      this._inventory.remove(product.getID());
    }
    else
      throw new ClientError("Client didn't provide a valid product id.");
  }
  @HttpMethod("PATCH", "The system was unable to update the item in the inventory.")
  public static update(req: Request, res: Response): void
  {
    const productID: string = req.body.product.id;
    let product: Product | null = this._inventory.find(productID);
    if (!product)
      throw new ClientError("Client didn't provide a valid product id.");
    product.update(req.body.product);
    product.save();
  }
  @HttpMethod("GET", "The system was unable to find the colors.")
  public static listColor(req: Request, res: Response): void
  {
    const color: string[] = Color.listAll();
    res.send({success: true, colors: color});
  }
  @HttpMethod("GET", "The system could not find the inventory categories")
  public static getCategories(req: Request, res: Response): void
  {
    const categories: Category[] = this._inventory.getCategories();
    const bCategories: ICategory.Body[] = categories.map(cur => cur.toPrimObj());
    res.send({success: true, categories: bCategories});
  }
  @HttpMethod("POST", "System was unable to add the inventory category.")
  public static addCategory(req: Request, res: Response): void {
    const categories: ICategory.Body[] = req.body.inventory.categories;
    for (let category of categories) {
      this._inventory.addCategory(new Category(category.name, category.id));
    }
  }
  @HttpMethod("POST", "System couldn't find the product from the item category")
  public static search(req: Request, res: Response)
  {
    const query: ISearchQuery.Product = req.body.product;
    const products: Product[] | null = ProductManager.from.queries(query);
    if(!products)
      res.send({ success: true, products: [] });
    else
      res.send({ success: true, products: products.map(cur => cur.toPrimitiveObj()) });
  }
  public static list(req: Request, res: Response, next: NextFunction): Product[] | void {
    const products: Product[] = this._inventory.list(-1);
    if (next) {
      next();
      return products;
    }
    else {
      res.send({ success: true, products: products });
    }
    return;
  }
}