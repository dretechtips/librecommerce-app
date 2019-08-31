import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { Actions } from "../interface/Dashboard.interface";
import * as pug from "pug";
import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";
import uuid = require("uuid/v4");
import { Discount } from "../model/Coupon";
const viewDir = './admin/view';

export class PromoController extends Controller
{
  private static _dashboardOptions: Actions[];
  public static add(req: Request, res: Response)
  {
    try {
      const promoType: string = req.body.type;
      if(promoType === "standard")
      {
        const result = PromoController.addStandard(req.body);
        if(!result) throw new Error("Unable to add a standard promotion to the system");
      }
      else if(promoType === "interval")
      {
        const result = PromoController.addInterval(req.body);
        if(!result) throw new Error("Unable to add a interval promotion to the system");
      }
    } catch (e) {
      
    }
  }
  private static addStandard(body: any): boolean
  {
    const promo: StandardPromo = 
    {
      name: body.name,
      id: uuid(),
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      productsID: body.productsID != undefined ? Array.from(body.productsID): [],
      categoriesID: body.categoriesID != undefined ? Array.from(body.categoriesID): [],
      all: body.all != undefined ? true : false,
      deal: new Discount(body.deal),
      active: body.active != undefined ? true : false,
    }
  }
  private static addInterval(body: any): boolean
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
    res.send(page);
  }
  public static renderAdd(req: Request, res: Response)
  {
    
  }
}