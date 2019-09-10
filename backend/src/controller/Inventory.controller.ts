import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import * as pug from "pug";
import { Action } from "../interface/Dashboard.interface";
import { Inventory, Product } from "../model/Inventory";
import { Color } from "../type/Color";
import { InventoryCategory } from "../interface/Inventory.interface";

const invDir = "./admin/view/inventory";
const viewDir = './admin/view';

export class InventoryController extends Controller
{
  private static inventory = new Inventory([]);
  protected static _dashboardActions: Action[] = 
  [{name: 'Search Inventory', path: '/admin/inventory/search', icon: 'fas fa-search'}, 
  {name: 'Add Product', path: '/admin/inventory/add', icon: 'fas fa-plus'},
  {name: 'Remove Product', path: '/admin/inventory/remove', icon: 'fas fa-minus'}];
  public static add(req: Request, res: Response)
  {
    const product: Product = Product.generate(req.body);
    this.inventory.add(product);
    product.save();
  }
  public static remove(req: Request, res: Response)
  {
    const product: Product = Product.From.id(req.body.id);
    product.remove();
    if(this.inventory.find(product.getValue().id))
    {
      this.inventory.remove(product.getValue().id);
    }
  }
  public static update(req: Request, res: Response)
  {
    const product: Product = Product.From.id(req.body.id);
    product.update(req.body);
    product.save();
  }
  public static getColorJSON(req: Request, res: Response)
  {
    const color: string[] = Color.allToArray();
    res.send({success: true, colors: color});
  }
  public static getCategories(req: Request, res: Response)
  {
    const categories: InventoryCategory[] = Inventory.fetchCategories();
    res.send({success: true, categories});
  }
  public static search(req: Request, res: Response)
  {
    
  }
  public static find(req: Request, res: Response)
  {
    const product: Product = Product.From.id(req.body.id);
    res.send(product.toPrimitiveObj());
  }
}