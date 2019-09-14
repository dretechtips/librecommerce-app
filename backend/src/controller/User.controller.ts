import { Request, Response } from "express-serve-static-core";
import { ActiveUsers, User } from "../model/User";
import uuid = require('uuid/v4');

export class UserController
{
  private static session = new ActiveUsers();
  public static verify(req: Request, res: Response): void
  {
    if(!req.cookies.accessToken)
    {
      res.send({success: false, error: "Client access token doesn't exist."});
    }
    else{
      if(UserController.session.hasToken(req.cookies.accessToken))
      {
        res.send({success: true, });
      }
      else
      {
        res.send({success: false, error: "Client access token has expired or is invalid."});
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