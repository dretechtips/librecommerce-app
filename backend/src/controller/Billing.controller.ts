import { Controller } from "./Controller";
import { Request, Response } from "express-serve-static-core";
import { Action } from "../interface/Dashboard.interface";

export class BillingController extends Controller
{
  protected static _dashboardActions: Action[] = [
    {name: "Search", path: "/admin/billing/search", icon: "fas fa-search"},
    {name: "Today", path: "/admin/billing/today", icon: "fas fa-calendar-day"}
  ]
  public static add(req: Request, res: Response)
  {
    
  }
}