import { default as Database, DatabaseQuery } from "./Database";
import { StoreCoupon, IndividualCoupon, CouponConstructor, CouponBody } from "../interface/Coupon.interface";
import { QueryResult, FieldDef } from "pg";
import uuid = require("uuid/v4");
import { DateRange } from "../type/Range";
import { Discount } from "../type/Discount";


export class Coupon
{
  private _value: CouponConstructor;
  private _details: DatabaseQuery;
  constructor(coupon: CouponConstructor)
  {
    this._value = coupon;
  }
  public static generate(body: CouponBody): Coupon {
    const coupon: CouponConstructor = {
      name: body.name,
      id: uuid(),
      dateRange: new DateRange(new Date(body.startDate), new Date(body.endDate)),
      productsID: body.productsID,
      categoriesID: body.categoriesID,
      all: body.all,
      deal: new Discount(body.deal),
      active: body.active,
      type: body.type,
      customerID: body.type === "individual" ? body.customerID : undefined
    }
    return new Coupon(coupon);
  }
  public delete(): void {
    
  }
  public save(): void {

  }
  public update(body: CouponBody): void {
    if (body.name) this._value.name = body.name;
    if (body.startDate && body.endDate) this._value.dateRange = new DateRange(new Date(body.startDate), new Date(body.endDate));
    if (body.productsID) this._value.productsID = body.productsID;
    if (body.categoriesID) this._value.categoriesID = body.categoriesID;
    if (body.all) this._value.all = body.all;
    if (body.deal) this._value.deal = new Discount(body.deal);
    if (body.active) this._value.active = body.active;
    if (this._value.type === "individual" && body.type === "individual")
      if (body.customerID) this._value.customerID = body.customerID;
  }
  public static From = class
  {
    public static id(id: string): Coupon
    {

    }
  }
}