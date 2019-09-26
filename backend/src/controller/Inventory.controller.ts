import { Request, Response } from "express";
import { Inventory, Product } from "../model/Inventory";
import { Color } from "../type/Color";
import { InventoryCategory } from "../interface/Inventory.interface";

export class InventoryController extends Controller
{
  private static _inventory = new Inventory([]);
  public static add(req: Request, res: Response): void
  {
    try {
      const product: Product = Product.generate(req.body);
      this.inventory.add(product);
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "The system was unable to add the item to the inventory!"});
    }
  }
  public static remove(req: Request, res: Response): void
  {
    try {
      const product: Product = Product.From.id(req.body.id);
      product.remove();
      if(this.inventory.find(product.getValue().id))
      {
        this.inventory.remove(product.getValue().id);
      }
      res.send({success: true})
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "The system was unable to remove the item from the inventory!"});
    }
  }
  public static update(req: Request, res: Response): void
  {
    try {
      let product: Product = this.inventory.find(req.body.id);
      if(product === null)
        product = Product.From.id(req.body.id);
      product.update(req.body);
      product.save();
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "The system was unable to update the item in the inventory!"});
    }
  }
  public static getColor(req: Request, res: Response): void
  {
    try {
      const color: string[] = Color.allToArray();
      res.send({success: true, colors: color});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "The system couldn't find the products color!"});
    }
  }
  public static getCategories(req: Request, res: Response)
  {
    try {
      const categories: InventoryCategory[] = Inventory.fetchCategories();
      res.send({success: true, categories});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "The system could not find the inventory categories"});
    }
  }
  public static search(req: Request, res: Response)
  {
    try {
      const products: Product[] = Product.From.queries(req.body);
      if(products.length === 0 ) throw new Error("Could not find the product within the system! Please try again.")
      else res.send({success: true, products: products.map(cur => cur.toPrimitiveObj())});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: ex.message});
    }
  }
  public static find(req: Request, res: Response)
  {
    try {
      const product: Product = Product.From.id(req.body.id);
      if(product === null) throw new Error("The product ID was doesn't exist within the system! Please try again.")
      res.send({success: true, product: product.toPrimitiveObj()});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: ex.message})
    }
  }
}