import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { Actions } from "../interface/Dashboard.interface";
import * as pug from "pug";
import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";
import uuid = require("uuid/v4");
import { Discount } from "../model/Coupon";
import { DateRange } from "../type/Range";
import { Promo } from "../model/Promo";
import { IntervalDate } from "../model/IntervalDate";
import { default as hconsole } from "../model/Console";
const viewDir = './admin/view';
const promoDir = viewDir + '/add';

export class PromoController extends Controller
{
  private static _dashboardOptions: Actions[];
  public static add(req: Request, res: Response): boolean
  {
    try {
      const promoType: string = req.body.type;
      if(promoType === "standard")
      {
        const result = PromoController.addStandard(req.body);
        if(!result) throw new Error("Unable to add a standard promotion to the system");
        return true;
      }
      else if(promoType === "interval")
      {
        const result = PromoController.addInterval(req.body);
        if(!result) throw new Error("Unable to add a interval promotion to the system");
        return true;
      }
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  private static getStandard(body: any): StandardPromo
  {
    const promo: StandardPromo = 
    {
      name: body.name,
      id: uuid(),
      dateRange: new DateRange(new Date(body.startDate), new Date(body.endDate)),
      productsID: body.productsID != undefined ? Array.from(body.productsID): [],
      categoriesID: body.categoriesID != undefined ? Array.from(body.categoriesID): [],
      all: body.all != undefined ? true : false,
      deal: new Discount(body.deal),
      active: body.active != undefined ? true : false,
      code: body.code,
      discriminator: 'standard',
    }
    return promo;
  }
  private static getInterval(body: any): IntervalPromo
  {
    const promo: IntervalPromo = 
    {
      name: body.name,
      id: uuid(),
      interval: new IntervalDate(Array.from(body.intervalDays)),
      productsID: body.productsID != undefined ? Array.from(body.productsID): [],
      categoriesID: body.categoriesID != undefined ? Array.from(body.categoriesID): [],
      all: body.all != undefined ? true : false,
      deal: new Discount(body.deal),
      active: body.active != undefined ? true : false,
      code: body.code.toUpperCase(),
      dateRange: new DateRange(new Date(body.startDate), new Date(body.endDate)),
      discriminator: 'interval',
    }
    return promo;
  }
  private static addStandard(body: any): boolean
  {
    const promo: StandardPromo = this.getStandard(body);
    const result: boolean = Promo.add(promo);
    return result;
  }
  private static addInterval(body: any): boolean
  {
    const promo: IntervalPromo = this.getInterval(body);
    const result: boolean = Promo.add(promo);
    return result;
  }
  public static remove(req: Request, res: Response): boolean
  {
    const promoID: string = req.body.promoID;
    const result: boolean = Promo.remove(promoID);
    if(!result) return false;
    return true;
  }
  public static update(req: Request, res: Response)
  {
    const promoType: string = req.body.type;
    if(promoType === "standard")
    {
      this.updateStandard(req.body);
    }
    else if(promoType === "interval")
    {
      this.updateInterval(req.body);
    }
  }
  private static updateStandard(body: any)
  {
    const promo: StandardPromo = this.getStandard(body);
    const doesExist: boolean = Promo.doesExist(promo.id);
    if(doesExist)
    {
      Promo.update(promo, promo.id);
    }
  }
  private static updateInterval(body: any)
  {
    const promo: IntervalPromo = this.getInterval(body);
    const doesExist: boolean = Promo.doesExist(promo.id);
    if(doesExist)
    {
      Promo.update(promo, promo.id);
    }
  }
  public static delete(req: Request, res: Response)
  {
    const promoID: string = req.body.id;
    Promo.remove(promoID);
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
    const page: string = pug.renderFile(promoDir + '/add.pug');
    res.send(page);
  }
  public static renderSearch(req: Request, res: Response)
  {
    const page: string = pug.renderFile(promoDir + '/search.pug');
    res.send(page);
  }
}