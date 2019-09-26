import { Request, Response, NextFunction } from "express";
import { Customer, ActiveCustomer, CustomerManager, PasswordResetList } from "../model/Customer";
import { HttpMethod } from "../decorator/HttpMethod";
import { CustomerConstructor, CustomerPasswordReset } from "../interface/Customer.interface";
import { ClientError, ServerError, DatabaseError } from "../model/Error";

export class CustomerController
{
  private static _session = new ActiveCustomer();
  private static _PRList = new PasswordResetList();
  @HttpMethod("ALL", "System couldn't verify the access token.")
  public static verify(req: Request, res: Response, next: NextFunction): void {
    const accessToken: string = req.cookies.accessToken;
    if (!accessToken)
      throw new ClientError("Client didn't provide a customer access token.");
    const customerID: string = this._session.fetch(accessToken);
    if (customerID !== null)
      return next();
    else
      throw new ServerError("System couldn't find the access token with the sessions.");
  }
  @HttpMethod("POST", "System was unable to sign in the customer")
  public static signin(req: Request, res: Response): Error {
    const clientID: string = req.body.customer.clientID;
    if (!clientID)
      throw new Error("Client didn't provide a client ID to sign-in.");
    const bCustomer: Buffer = Buffer.from(clientID, "base64");
    const sCustomer: string = bCustomer.toString();
    const [username, password] = sCustomer.split(":");
    if (!username || !password) {
      res.send({ success: false, error: "Make sure a username and password was sent" });
      return;
    } 
    const customer: Customer = CustomerManager.from.credientals(username, password);
    if (!customer)
      throw new DatabaseError("Database cannot find the username and password.");
    else {
      const accessToken: string = this._session.add(customer);
      res.cookie("accessToken" , accessToken).send({ success: true });
    }
  }
  @HttpMethod("POST", "System was unable to add the customer.")
  public static add(req: Request, res: Response): void
  {
    if (!req.body.customer)
      throw new ClientError("Client didn't provide the customer data.");
    const cData: CustomerConstructor = req.body.customer;
    CustomerManager.add(cData);
    res.send({ success: true });
  }
  @HttpMethod("DELETE", "System was unable to delete the customer.")
  public static remove(req: Request, res: Response): void
  {
    const customerID: string = req.body.customer.id;
    if (!customerID)
      throw new ClientError("Client didn't provide a client ID to the system.");
    CustomerManager.delete(customerID);
    this._session.remove(customerID);
  }
  @HttpMethod("PATCH", "System was unable to update the customer.")
  public static update(req: Request, res: Response): void
  {
    const customerID: string = req.body.customer.id;
    if (!customerID)
      throw new ClientError("Client didn't send customer ID to the system.");
    const customer: Customer = CustomerManager.from.id(customerID);
    customer.update(req.body);
    customer.save();
  }
  @HttpMethod("POST", "System was unable to email the customer their password")
  public static emailPassword(req: Request, res: Response): void
  {
    // A request has been sent to change your password. Here a link to change your password
    // https://rufftiger.com/client/resetpassword
    // Note: The link will expire in 24 hours. 
  }
  @HttpMethod("PATCH", "System was unable to reset your password.")
  public static passwordReset(req: Request, res: Response): void {
    const reset: CustomerPasswordReset = req.body.reset;
    if (!reset)
      throw new ClientError("Client didn't present a reset ID to the system.");
    const customerID: string = this._PRList.fetch(reset.id);
    if (!customerID)
      throw new Error("Password Reset List was unable to get the customer ID from the reset ID");
    const customer: Customer = CustomerManager.from.id(customerID);
    const isRemove: boolean = this._PRList.remove(reset.id);
    if (!isRemove)
      throw new ServerError("System couldn't find the client ID from the system.");
  }
}