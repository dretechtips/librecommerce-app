import { IPromo } from "../interface/Promo.interface";
import { DatabaseQueryConstructor, DatabaseKeyValue } from "../interface/Database.interface";
import { Database, DatabaseQuery } from "../model/Database";
import uuid = require('uuid/v4');
import { DateRange } from "../type/Range";
import { Discount } from "../type/Discount";

export class Promo
{
  private _values: IPromo.Constructor;
  constructor(promo: IPromo.Constructor)
  {
    this._values = promo;
  }
  public save(): void {
    // Database Method
  }
  public delete(): void {
    // Database Method
  }
  public update(body: any)
  {
    if(body.name) this._values.name = body.name;
    if(body.productsID) this._values.productsID = body.productsID;
    if(body.categoriesID) this._values.categoriesID = body.categoriesID;
    if(body.all) this._values.all = body.all;
    if(body.code) this._values.code = body.code;
    if(body.deal) this._values.deal = new Discount(body.deal);
    if (body.dateStart && body.dateEnd) this._values.dateRange = new DateRange(new Date(body.dateStart), new Date(body.dateEnd));
  }
  public static generate(body: IPromo.NewBody): Promo
  {
    let promo: IPromo.Constructor = {
      name: body.name,
      id: uuid(),
      dateRange: new DateRange(new Date(body.dateStart), new Date(body.dateEnd)),
      productsID: body.productsID != undefined ? Array.from(body.productsID): [],
      categoriesID: body.categoriesID != undefined ? Array.from(body.categoriesID): [],
      all: body.all != undefined ? true : false,
      deal: new Discount(body.deal),
      code: body.code,
    }
    return new Promo(promo);
  }
}

export class PromoManager {
  public static from = class {
    public static id(promoID: string): Promo | null {

    }
  }
}