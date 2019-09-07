import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { Action } from "../interface/Dashboard.interface";

export class CouponsController extends Controller
{
  protected static _dashboardActions: Action[] =
  [{name: "Add Coupon", path: "/admin/coupon/add" , icon: "fas fa-add"},
  {name: "Search Coupon", path: "/admin/coupon/delete", icon: "fas fa-search"}]
  public static add(req: Request, res: Response)
  {
    
  }
  public static delete(req: Request, res: Response)
  {

  }
  public static update(req: Request, res: Response)
  {

  }
  public static search(req: Request, res: Response)
  {
    
  }
}