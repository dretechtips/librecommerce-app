import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import * as pug from "pug";
import { Actions } from "../interface/Dashboard.interface";
import { Inventory, Product } from "../model/Inventory";

const invDir = "./admin/view/inventory";
const viewDir = './admin/view';

export class InventoryController extends Controller
{
  private static inventory = new Inventory([]);
  protected static _dashboardActions: Actions[] = 
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
  public static renderAdd(req: Request, res: Response)
  {
    const page: string = pug.renderFile(invDir + '/add.pug');
    res.send(page);
  }
  public static renderDashboard(req: Request, res: Response)
  {
    const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: this._dashboardActions
    });
    res.send(page);
  }
  public static renderSearch(req: Request, res: Response)
  {
    const page = pug.renderFile(invDir + '/search.pug');
    res.send(page);
  }
}