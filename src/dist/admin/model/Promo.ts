import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";
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
  public static add(promo: StandardPromo | IntervalPromo): boolean
  {
    const val: DatabaseKeyValue[] = [["name", promo.name], ["id", promo.id], ["productsID", promo.productsID], 
    ["categoriesID", promo.categoriesID], ["all", promo.all], ["code", promo.code], 
    ["deal", promo.deal.toNum()], ["active", promo.deal.toNum()], ["dateRange", promo.dateRange.toStringArray()]]
    if(Promo.isStandardPromo)
    {
      const query: DatabaseQuery = new DatabaseQuery(this._details);
      query.insert(val);
    }
    else if(Promo.isIntervalPromo)
    {
      const query: DatabaseQuery = new DatabaseQuery(this._details);
      val.push(["interval", (promo as IntervalPromo).interval.toStringArray()]);
      query.insert(val);
    }
  }
  public static isStandardPromo(promo: StandardPromo | IntervalPromo): promo is StandardPromo
  {
    return promo.discriminator === 'standard';
  }
  public static isIntervalPromo(promo: StandardPromo | IntervalPromo): promo is IntervalPromo
  {
    return promo.discriminator === 'interval';
  }
  public static remove(promoID: string): boolean
  {
    const query: DatabaseQuery = new DatabaseQuery(this._details);
    query.delete(`id = ${promoID}`);
  }
  public static update(promo: StandardPromo | IntervalPromo, promoID: string)
  {

  }
  public static doesExist(promoID: string): boolean
  {
    
  }
  public static searchID(promoID: string): StandardPromo | IntervalPromo
  {

  }
  public static searchName(promoName: string) : StandardPromo | IntervalPromo
  {
    
  }
}