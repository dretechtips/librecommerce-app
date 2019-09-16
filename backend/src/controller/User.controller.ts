import { Request, Response, NextFunction } from "express-serve-static-core";
import { ActiveUsers, User } from "../model/User";
import uuid = require('uuid/v4');

export class UserController
{
  private static session = new ActiveUsers(null);
  public static verify(req: Request, res: Response, next: NextFunction): void
  {
    if(!req.cookies.accessToken)
    {
      res.send({ success: false, error: "Client access token doesn't exist." });
      return;
    }
    else{
      if(UserController.session.hasToken(req.cookies.accessToken))
      {
        return next();
      }
      else
      {
        res.send({ success: false, error: "Client access token has expired or is invalid." });
        return;
      }
    }
  }
  public static login(req: Request, res: Response): void
  {
    const eCred: string = req.body.clientID;
    const bCred: Buffer = Buffer.from(eCred, "base64");
    const dCred: string = bCred.toString();
    const [username, password] = dCred.split(":");
    const user: User = User.From.cred(username, password);
    if(user === null)
    {
      res.send({success: false, error: "Your password or username was incorrect."});
    }
    else 
    {
      const accessToken: string = uuid();
      UserController.session.add(accessToken, user);
      res.send({success: true, accessToken: accessToken});
    }
  }
  public static update(req: Request, res: Response): void
  {

  }
}