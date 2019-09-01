import { Request, Response } from "express-serve-static-core";
import * as pug from "pug";
import { Controller } from "./Controller";
import { Actions } from "../interface/Dashboard.interface";
import { Orders } from "../model/Orders";
import { OrderConstructor } from "../interface/Order.interface";
import { Customers } from "../model/Customers";
import uuid = require("uuid/v4");
import { EmailAddress, PhoneNum } from "../model/Location";
import { Money } from "../model/Money";
import { FieldDef, QueryResult } from "pg";
import hconsole from "../model/Console";
const viewDir = "./admin/view";
const orderDir = "./admin/view/orders";

export class OrdersController extends Controller
{
  private static _dashboardActions: Actions[] = 
  [{name: "Search Order", path: "/admin/orders/search", icon: "fas fa-search"},
  {name: "Add Order", path: "/admin/orders/add", icon: "fas fa-plus"},
  {name: "Remove Order", path: "/admin/orders/remove", icon: "fas fa-minus"},
  {name: "Refund Order", path: "/admin/orders/refund", icon: "fas fa-money-bill"}];
  public static renderDashboard(req: Request, res: Response): void
  {
    const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: this._dashboardActions
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
    if(req.body.type === "newCustomer")
    {
      this.addFromNewCustomer(req.body);
    }
    else if(req.body.type === "existingCustomer")
    {
      this.addFromExistingCustomer(req.body);
    }
    
  }
  private static generate(body: any)
  {
    const order: OrderConstructor = 
    {
      id: uuid(),
      username: body.username !== undefined ? body.username : "",
      timestamp: new Date(),
      productsID: body.productsID,
      address: body.address,
      email: new EmailAddress(body.email),
      phone: new PhoneNum(body.phoneNum),
    }
  }
  private static addFromNewCustomer(body: any)
  {
    this.generate(body);
  }
  private static async addFromExistingCustomer(body: any)
  {
    try {
      const customers: any[] = await Customers.SearchUsername(body.username);
      if(customers.length > 0)
      {
        body.username = customers[0][4];
        body.address = customers[0][7];
        body.email = customers[0][0];
        body.phoneNum = customers[0][9];
        this.generate(body);
      }
      else throw new Error("The username specified doesn't exist!");
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public static remove(req: Request, res: Response): void
  {
    
  }
  public static update(req: Request, res: Response): void
  {
    const body = req.body;
    const orderID: string = body.orderID;
    if(body.cancelled)
    {
      
    }
  }
}