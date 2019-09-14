import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";
import uuid = require("uuid/v4");
import { Discount } from "../type/Discount";
import { DateRange } from "../type/Range";
import { Promo } from "../model/Promo";
import { IntervalDate } from "../type/IntervalDate";
import { default as hconsole } from "../model/Console";

export class PromoController extends Controller
{
  public static add(req: Request, res: Response): void
  {
    try {
      const promoType: string = req.body.promoType;
      if(!promoType) throw new Error("Promo type wasn't specified."); 
      if(promoType === "standard")
      {
        const result: StandardPromo = Promo.generate(req.body, "standard");
        if(!result) throw new Error("Unable to add a standard promotion to the system.");
      }
      else if(promoType === "interval")
      {
        const result: IntervalPromo = Promo.generate(req.body, "interval") as IntervalPromo;
        if(!result) throw new Error("Unable to add a interval promotion to the system.");
      }
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
      res.send({success: false, error: ex.message});
    }
  }
  public static update(req: Request, res: Response)
  {
    try {
      const promoType: string = req.body.type;
      const promoID: string = req.body.id;
      if(promoType === "standard")
      {
        this.updateStandard(req.body);
      }
      else if(promoType === "interval")
      {
        this.updateInterval(req.body);
      }
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, });
    }
  }
  public static delete(req: Request, res: Response)
  {
    try {
      const promoID: string = req.body.promoID;
      if(!promoID) throw new Error("Promo ID wasn't specified when deleting a promotion");
      const promo: Promo = Promo.From.id(promoID);
      promo.remove();
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: ex.message});
    }
  }
}