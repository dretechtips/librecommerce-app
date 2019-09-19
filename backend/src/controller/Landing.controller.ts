import { Controller } from "./Controller";
import pug = require('pug');
import { Request, Response } from "express-serve-static-core";

export class LandingController extends Controller
{
  private static _viewDir: string = "";
  public static renderHome(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._viewDir + "/home.pug");
    res.send(page);
  }
  public static renderShop(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._viewDir + "/shop.pug");
    res.send(page)
  }
  public static renderContract(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._viewDir + "/contact.pug");
    res.send(page);
  }
}