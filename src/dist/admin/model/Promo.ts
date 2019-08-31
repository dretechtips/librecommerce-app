import { StandardPromo, IntervalPromo } from "../interface/Promo.interface";

export class Promo
{
  public static add(promo: StandardPromo | IntervalPromo)
  {
    if(Promo.isStandardPromo)
    {
      Promo.addStandard(promo as StandardPromo);
    }
    else if(Promo.isIntervalPromo)
    {
      Promo.addInterval(promo as IntervalPromo);
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
  public static addStandard(promo: StandardPromo): boolean
  {
  
  }
  public static addInterval(promo: IntervalPromo): boolean
  {
    
  }
  public static remove(promoID: string): boolean
  {

  }
  public static update(promo: StandardPromo | IntervalPromo, promoID: string)
  {

  }
  public static searchID(promoID: string)
  {

  }
  public static searchName(promoName: string)
  {
    
  }
}