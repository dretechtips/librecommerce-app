import { NextFunction, Request, Response } from "express-serve-static-core";
import * as pug from "pug";
const viewDir = "./admin/view";

export class UsersController
{
  public static loginValidation(req: Request, res: Response, next: NextFunction): void
  {
    if(!req.session.loginID && req.path !== '/login')
    {
      res.redirect('/admin/login');
    }
    else{
      next();
    }
  }
  public static renderLoginPage(req: Request, res: Response): void
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
      req.session.loginID = uuid();
      res.redirect('/admin/home');
    }
    else 
    {
      res.redirect('/admin/login?error=true');
    }
  }
}