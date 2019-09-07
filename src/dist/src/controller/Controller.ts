import { Request, Response } from "express-serve-static-core";
import { Action } from "../interface/Dashboard.interface";
import * as fs from "fs";
import hconsole from "../model/Console";
import pug = require("pug");

export class Controller
{
  protected static _dashboardActions: Action[];
  private static _viewDir: string = './view/';
  private static _adminViewDir: string = "./view/admin";
  private static _clientViewDir: string = "./view/client";
  private static _landingViewDir: string = "./view/landing";
  protected static _childViewDir: string;
  protected static _layoutViewDir: string;
  protected static _searchItems: any[];
  protected static _itemInfo: any;
  private static init(): Error
  {
    if(!this._dashboardActions) 
      return new Error("The dashboard actions has not been setup");
    if(!this._layoutViewDir)
      return new Error("The layouts view directory has not been setup");
    if(!this._childViewDir)
      return new Error("The controller view directory has not been setup");
    return null;
  }
  private static override()
  {
    try {
      throw "The controller method must be overidden";
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public static add(req: Request, res: Response): void { Controller.override(); }
  public static delete(req: Request, res: Response): void { Controller.override(); } 
  public static update(req: Request, res: Response): void { Controller.override(); }
  public static search(req: Request, res: Response): void { Controller.override(); }
  public static renderDashboard(req: Request, res: Response): void 
  {
    try {
      Controller.init();
      const page = pug.renderFile(this._layoutViewDir + '/actions.pug', {
        actions: this._dashboardActions,
      });
      res.send(page);
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static renderSearch(req: Request, res: Response): void { 
    try {
      Controller.init();
      fs.exists(this._adminViewDir + this._childViewDir + '/search.pug', (exists) => {
        if(!exists) throw "Search view doesn't exist.";
        const page = pug.renderFile(this._adminViewDir + this._childViewDir + '/search.pug', {
          items: this._searchItems,
          success: req.body.success
        });
      });
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static renderAdd(req: Request, res: Response): void { 
    try {
      Controller.init();
      fs.exists(this._adminViewDir + this._childViewDir + '/add.pug', (exists) => {
        if(!exists) throw "Add view doesn't exist";
        const page = pug.renderFile(this._adminViewDir + this._childViewDir + '/add.pug', {
          success: req.query.success,
        });
      });
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
   }
  public static renderRemove(req: Request, res: Response): void {  }
  public static renderUpdate(req: Request, res: Response): void {
    try {
      Controller.init();
      fs.exists(this._adminViewDir + this._childViewDir + '/update.pug', (exists) =>
      {
        if(!exists) throw "Update view doesn't exist";
        const page = pug.renderFile(this._adminViewDir + this._childViewDir + '/update.pug', {
          info: this._itemInfo,
        });
        res.send(page);
      });
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
}