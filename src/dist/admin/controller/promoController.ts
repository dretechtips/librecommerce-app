import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { Actions } from "../interface/Dashboard.interface";
import * as pug from "pug";
const viewDir = './admin/view';

export class PromoController extends Controller
{
  private static _dashboardOptions: Actions[];
  public static add(req: Request, res: Response)
  {
    
  }
  public static remove(req: Request, res: Response)
  {
    
  }
  public static update(req: Request, res: Response)
  {
    
  }
  public static delete(req: Request, res: Response)
  {
    
  }
  public static renderDashboard(req: Request, res: Response)
  {
    const page: string = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: this._dashboardOptions,
    });
  }
  public static renderAdd(req: Request, res: Response)
  {
    
  }
}