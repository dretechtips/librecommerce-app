import { Request, Response } from "express";
import uuid = require("uuid/v4");
import { Discount } from "../type/Discount";
import { DateRange } from "../type/Range";
import { HttpMethod } from "../decorator/HttpMethod";
import { IPromo } from "../interface/Promo.interface";
import { PromoManager, Promo } from "../model/Promo";
import { ClientError } from "../model/Error";

export class PromoController {
  @HttpMethod("POST", "System was unable to add a new promotion.")
  public static add(req: Request, res: Response): void {
    const bPromo: IPromo.NewBody = req.body.promo;
    const promo: Promo = Promo.generate(bPromo);
    promo.save();
  }
  @HttpMethod("PATCH", "System was unable to update a promotion.")
  public static update(req: Request, res: Response): void {
    const promoID: string = req.body.promo.id;
    const promo: Promo | null = PromoManager.from.id(promoID);
    if (promo)
      promo.update(req.body.promo);
    else
      throw new ClientError("Client provided an invalid promo ID");
  }
  @HttpMethod("DELETE", "System was unable to delete a promotion.")
  public static delete(req: Request, res: Response): void {
    const promoID: string = req.body.promo.id;
    const promo: Promo | null = PromoManager.from.id(promoID);
    if (promo)
      promo.delete();
    else
      throw new ClientError("Client provided an invalid promo ID");
  }
}

