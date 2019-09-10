import { NextFunction, Request, Response } from "express-serve-static-core";
import * as pug from "pug";
const viewDir = "./admin/view";

export class UserController
{
  public static verify(req: Request, res: Response, next: NextFunction): void
  {
    if(!req.cookies.loginID && req.path !== '/login')
    {
      res.redirect('/admin/login');
    }
    else{
      next();
    }
  }
  public static renderLogin(req: Request, res: Response): void
  {
    const error = req.query.error;
    const page = pug.renderFile(viewDir + '/login.pug', {
      error: error ? true : false
    });
    res.send(page);
  }
  public static login(req: Request, res: Response): void
  {
    const user = req.body.user;
    const pass = req.body.pass;
    const validation = new Validation(user, pass);
    if(validation)
    {
      req.cookies.loginID = uuid();
      res.redirect('/admin/home');
    }
    else 
    {
      res.redirect('/admin/login?error=true');
    }
  }
}