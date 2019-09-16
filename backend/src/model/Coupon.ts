import { default as Database, DatabaseQuery } from "./Database";
import { StoreCoupon, IndividualCoupon, BaseCoupon } from "../interface/Coupon.interface";
import { QueryResult, FieldDef } from "pg";


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