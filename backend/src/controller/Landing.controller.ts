import { Controller } from "./Controller";
import pug = require('pug');
import { Request, Response } from "express-serve-static-core";

export class LandingController extends Controller
{
  public static renderHome(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._landingViewDir + "/home.pug");
    res.send(page);
  }
  public static renderShop(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._landingViewDir + "/shop.pug");
    res.send(page)
  }
  public static renderContract(req: Request, res: Response): void
  {
    const page: string = pug.renderFile(this._landingViewDir + "/contact.pug");
    res.send(page);
  }
}