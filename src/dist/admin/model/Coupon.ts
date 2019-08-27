import { default as Database } from "./Database";
import { StoreCoupon, IndividualCoupon } from "../interface/Coupon.interface";
import { QueryResult, FieldDef } from "pg";

export class Coupon
{
  public static async Add(coupon: StoreCoupon | IndividualCoupon): Promise<Boolean>
  {
    try
    {
      const query: string = `INSERT INTO coupons`;
      const result = await Database._db.main.singleQuery(query);
    }
    catch(e)
    {

    }
  }
  public static async Remove(couponID: string): Promise<boolean>
  {

  }
  public static async Modify(coupon: StoreCoupon | IndividualCoupon): Promise<boolean>
  {

  }
  public static async GetID(couponID: string): Promise<FieldDef | false>
  {

  }
  public static async GetName(couponName: string): Promise<FieldDef | false>
  {

  }
}

export class Discount
{
  private discount: number;
  constructor(discount: number)
  {
    if(discount > 100)
    {
      this.discount = 100;
    }
    else if (discount < 0)
    {
      this.discount = 0;
    }
    else this.discount = discount;
  }
  public toNum() : number
  {
    return this.discount;
  }
  public apply(money: number): number
  {
    return parseFloat((money * this.discount).toFixed(2));
  }
}