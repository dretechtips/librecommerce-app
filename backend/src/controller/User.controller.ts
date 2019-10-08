import { Request, Response, NextFunction } from "express";
import { ActiveUsers, User, UserManager } from "../model/User";
import uuid = require('uuid/v4');
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError, ServerError } from "../type/Error";
import { PasswordResetList } from "../model/Account";

export class UserController
{
  private static _session = new ActiveUsers();
  private static _PRList = new PasswordResetList();
  @HttpMethod("ALL", "System was unable to verify the employee / user.")
  public static verify(req: Request, res: Response, next: NextFunction): void
  {
    const accessToken: string = req.cookies.accessToken;
    if (!accessToken)
      throw new ClientError("Client didn't provide a customer access token.");
    const customerID: string | null = this._session.fetch(accessToken);
    if (customerID !== null)
      return next();
    else
      throw new ServerError("System couldn't find the access token with the sessions.");
  }
  @HttpMethod("POST", "System was unable to login the user.")
  public static login(req: Request, res: Response): void
  {
    const eCred: string = req.body.clientID;
    const bCred: Buffer = Buffer.from(eCred, "base64");
    const dCred: string = bCred.toString();
    const [username, password] = dCred.split(":");
    const user: User | null = UserManager.from.credientals(username, password) as User | null;
    if(!user)
      throw new ClientError("Client password or username was incorrect.");
    else 
    {
      const accessToken: string = this._session.add(user);
      res.cookie("customer_access_token", accessToken).send({ success: true });
    }
  }
  @HttpMethod("PATCH", "System was unable to update the employee / user.")
  public static update(req: Request, res: Response): void
  {

  }
  @HttpMethod("POST", "System was unable to add an user / employee")
  public static add(req: Request, res: Response): void {
    const user: User = User.generate(req.body.user);
    this._session.add(user);
  }
  @HttpMethod("DELETE", "System was unable to delete the employee / user.")
  public static delete(): void {
    
  }
  @HttpMethod("PATCH", "System was unable to email password to user.")
  public static passwordReset(): void {

  }
  @HttpMethod("POST", "System was unable to create")
  public static emailPassword(): void {

  }
}