import { StandardPromo, IntervalPromo, BasePromo } from "../interface/Promo.interface";
import { DatabaseQueryConstructor, DatabaseKeyValue } from "../interface/Database.interface";
import { Database, DatabaseQuery } from "../model/Database";
import uuid = require('uuid/v4');
import { DateRange } from "../type/Range";
import { Discount } from "../type/Discount";

export class Promo
{
  private static _details: DatabaseQueryConstructor =
  {
    table: "promo",
    schema: "public",
    col: ["name", "id", "productsID", "categoriesID", "all", "code", "deal", "active", "dateRange", "interval"]
  }
  private isSaved: boolean;
  private _values: BasePromo;
  constructor(promo: BasePromo | IntervalPromo | StandardPromo)
  {
    this._values = promo;
  }
  public save(): void
  {
    this.isSaved = true;
  }
  private removeFromDatabase(): boolean
  {
    
  }
  public remove(): void
  {
    if(this.isSaved)
    {
      this.removeFromDatabase();
    }
  }
  public update(body: any)
  {
    if(body.name) this._values.name = body.name;
    if(body.productsID) this._values.productsID = body.productsID;
    if(body.categoriesID) this._values.categoriesID = body.categoriesID;
    if(body.all) this._values.all = body.all;
    if(body.code) this._values.code = body.code;
    if(body.deal) this._values.deal = new Discount(body.deal);
    if(body.active) this._values.active = body.active;
    if(body.dateRange) this._values.dateRange = new DateRange(new Date(body.dataRange[0]), new Date(body.dateRange[1]))
    const intervalPromo: IntervalPromo = this._values as IntervalPromo;
    if(intervalPromo.interval && body.interval)
      this._values.interval
  }
  public static generate(body: any, type: string): BasePromo
  {
    let promo: BasePromo = {
      name: body.name,
      id: uuid(),
      dateRange: new DateRange(new Date(body.startDate), new Date(body.endDate)),
      productsID: body.productsID != undefined ? Array.from(body.productsID): [],
      categoriesID: body.categoriesID != undefined ? Array.from(body.categoriesID): [],
      all: body.all != undefined ? true : false,
      deal: new Discount(body.deal),
      active: body.active != undefined ? true : false,
      code: body.code,
    }
    if(type === "standard")
    {
      return promo as StandardPromo;
    }
    else if(type === "interval")
    {
      const promoV2: IntervalPromo = promo as IntervalPromo;
      promoV2.interval = new IntervalDate();
      return promoV2;
    }
    else
      throw new Error("Type Error: Promotion type " + type + " doesn't exist.");
  }
  public static From = class
  {
    public static id(promoID: string): Promo
    {
      
    }
  }
}