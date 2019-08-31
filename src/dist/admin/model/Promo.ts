import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";

export class Promo
{
  public static add(promo: StandardPromo | IntervalPromo)
  {
    
  }
  public static isStandardPromo(promo: StandardPromo | IntervalPromo): promo is StandardPromo
  {
    return promo.discriminator === 'standard';
  }
  public static isIntervalPromo(promo: StandardPromo | IntervalPromo): promo is IntervalPromo
  {
    return promo.discriminator === 'interval';
  }
  public static remove(promoID: string)
  {

  }
  public static update(promoID: string)
  {

  }
  public static searchID(promoID: string)
  {

  }
  public static searchName(promoName: string)
  {
    
  }
}