import { StandardPromo, IntervalPromo, BasePromo } from "../interface/Promo.interface";
import { DatabaseQueryConstructor, DatabaseKeyValue } from "../interface/Database.interface";
import { Database, DatabaseQuery } from "../model/Database";

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
  constructor(promo: BasePromo)
  {
    this._values = promo;
  }
  save()
  {
    this.isSaved = true;
  }
  private removeFromDatabase()
  {
    
  }
  public remove()
  {
    if(this.isSaved)
    {
      this.removeFromDatabase();
    }
  }
  public static From = class
  {
    public static id()
    {
      
    }
  }
  // public static add(promo: BasePromo): boolean
  // {
  //   const val: DatabaseKeyValue[] = [["name", promo.name], ["id", promo.id], ["productsID", promo.productsID], 
  //   ["categoriesID", promo.categoriesID], ["all", promo.all], ["code", promo.code], 
  //   ["deal", promo.deal.toNum()], ["active", promo.deal.toNum()], ["dateRange", promo.dateRange.toStringArray()]]
  //   if(Promo.isStandardPromo)
  //   {
  //     const query: DatabaseQuery = new DatabaseQuery(this._details);
  //     query.insert(val);
  //   }
  //   else if(Promo.isIntervalPromo)
  //   {
  //     const query: DatabaseQuery = new DatabaseQuery(this._details);
  //     val.push(["interval", (promo as IntervalPromo).interval.toStringArray()]);
  //     query.insert(val);
  //   }
  // }
  // public static isStandardPromo(promo: StandardPromo | IntervalPromo): promo is StandardPromo
  // {
  //   return promo.discriminator === 'standard';
  // }
  // public static isIntervalPromo(promo: StandardPromo | IntervalPromo): promo is IntervalPromo
  // {
  //   return promo.discriminator === 'interval';
  // }
  // public static remove(promoID: string): boolean
  // {
  //   const query: DatabaseQuery = new DatabaseQuery(this._details);
  //   query.delete(`id = ${promoID}`);
  // }
}