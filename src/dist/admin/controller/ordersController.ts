import { Request, Response } from "express-serve-static-core";
import * as pug from "pug";
import { Controller } from "./Controller";
const Orders = require("../model/Orders");
const viewDir = "./admin/view";
const orderDir = "./admin/view/orders";

export class OrdersController extends Controller
{
  public static renderDashboard(req: Request, res: Response): void
  {
    const actionsArray = [{name: "Search Order", link: "/admin/orders/search", icon: "fas fa-search"},
    {name: "Add Order", link: "/admin/orders/add", icon: "fas fa-plus"},
    {name: "Remove Order", link: "/admin/orders/remove", icon: "fas fa-minus"},
    {name: "Refund Order", link: "/admin/orders/refund", icon: "fas fa-money-bill"}]
    const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: actionsArray
    });
    res.send(page);
  }
  public static renderSearch(req: Request, res: Response): void
  {
    const page = pug.renderFile(orderDir + '/search.pug');
    res.send(page);
  }
  public static renderAdd(req: Request, res: Response): void
  {
    if(!req.query.customers)
    {
      const page = pug.renderFile(orderDir + '/add.pug');
      res.send(page);
    }
    else
    {
      const customers = req.query.customers;
      const page = pug.renderFile(orderDir + '/add.pug', 
      {
        customers
      });
      res.send(page);
    }
  }
  public static add(req: Request, res: Response): void
  {

  }
  public static remove(req: Request, res: Response): void
  {
    
  }
  public static update(req: Request, res: Response): void
  {
    
  }
}