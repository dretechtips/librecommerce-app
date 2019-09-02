import { Request, Response } from "express-serve-static-core";
import { Actions } from "../interface/Dashboard.interface";

export class Controller
{
  protected static _dashboardActions: Actions[];
  public static add(req: Request, res: Response): void {  }
  public static remove(req: Request, res: Response): void {  } 
  public static update(req: Request, res: Response): void {  }
  public static renderDashboard(req: Request, res: Response): void {  }
  public static renderSearch(req: Request, res: Response): void {  }
  public static renderAdd(req: Request, res: Response): void {  }
  public static renderRemove(req: Request, res: Response): void {  }
  public static renderUpdate(req: Request, res: Response): void {  }
}