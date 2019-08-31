import { NextFunction, Request, Response } from "express-serve-static-core";
import * as pug from "pug";
const viewDir = "./admin/view";

export class IndexController
{
  public static renderHomePage(req: Request, res: Response): void
  {
    const orders = [{name: 'Will Smith', id: 347824032, date: '01/20/2003', products: '5 Magic Mangos(5 Packs)', address: '2500 Frosted Green'}];
    const inventory = [{name: "Magic Mango", price: 19.20, brand: "Teariffic", rating: 4.2, stock: true, id: 34627493289}];
    const accounts = [{user: "admin", pass: "34242vsdvs", date: "01-20-2003", id: 42342346786482}];
    const page = pug.renderFile(viewDir + '/index.pug', {
      orders,
      inventory,
      accounts
    });
    res.send(page);
  }
}