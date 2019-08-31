import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import * as pug from "pug";
import { Actions } from "../interface/Dashboard.interface";

const invDir = "./admin/view/inventory";
const viewDir = './admin/view';

export class InventoryController extends Controller
{
  public static add(req: Request, res: Response)
  {
    
  }
  public static remove(req: Request, res: Response)
  {
    
  }
  public static update(req: Request, res: Response)
  {
    
  }
  public static renderAdd(req: Request, res: Response)
  {
    const page: string = pug.renderFile(invDir + '/add.pug');
    res.send(page);
  }
  public static renderDashboard(req: Request, res: Response)
  {
    const actions: Actions[] = [{name: 'Search Inventory', path: '/admin/inventory/search', icon: 'fas fa-search'}, 
    {name: 'Add Product', path: '/admin/inventory/add', icon: 'fas fa-plus'},
    {name: 'Remove Product', path: '/admin/inventory/remove', icon: 'fas fa-minus'}];
    const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: actions
    });
    res.send(page);
  }
  public static renderSearch(req: Request, res: Response)
  {
    const page = pug.renderFile(invDir + '/search.pug');
    res.send(page);
  }
}