import { default as Database, DatabaseQuery } from "./Database";
import { StoreCoupon, IndividualCoupon, BaseCoupon } from "../interface/Coupon.interface";
import { QueryResult, FieldDef } from "pg";

// export class Coupon
// {
//   public static async Add(coupon: StoreCoupon | IndividualCoupon): Promise<Boolean>
//   {
//     try
//     {
//       const query: string = `INSERT INTO coupons`;
//       const result = await Database._db.main.singleQuery(query);
//     }
//     catch(e)
//     {

//     }
//   }
//   public static async Remove(couponID: string): Promise<boolean>
//   {

//   }
//   public static async Modify(coupon: StoreCoupon | IndividualCoupon): Promise<boolean>
//   {

//   }
//   public static async GetID(couponID: string): Promise<FieldDef | false>
//   {

//   }
//   public static async GetName(couponName: string): Promise<FieldDef | false>
//   {

//   }
// }

export class Coupon
{
  private _value: BaseCoupon;
  private _details: DatabaseQuery;
  constructor(coupon: BaseCoupon)
  {
    this._value = coupon;
  }
  public static From = class
  {
    public static id(id: string)
    {

    }
  }
}