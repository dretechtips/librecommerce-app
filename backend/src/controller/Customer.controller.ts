import { Request, Response, NextFunction } from "express-serve-static-core";
import { Controller } from "./Controller";
import { Customer, ActiveCustomer } from "../model/Customer";
import hconsole from "../model/Console";

export class CustomerController extends Controller
{
  private static session = new ActiveCustomer(null);
  public static verify(req: Request, res: Response, next: NextFunction): void {
    const accessToken: string = req.body.accessToken;
    if (!accessToken) {
      res.send({ success: false, error: "Customer access token doesn't exist." });
      return;
    } 
    const customer: Customer = this.session.fetch(accessToken);
    if (customer !== null)
      return next();
    else {
      res.send({ success: false, error: "System couldn't verify the access token" });
      return;
    }
  }
  public static signin(req: Request, res: Response): void {
    try {
      const clientID: string = req.body.clientID;
      const bCustomer: Buffer = Buffer.from(clientID, "base64");
      const dCustomer: string = bCustomer.toString();
      const [username, password] = dCustomer.split(":");
      if (!username || !password) {
        res.send({ success: false, error: "Make sure a username and password was sent" });
        return;
      } 
      const customer: Customer = Customer.From.cred(username, password);
      if (customer === null) {
        res.send({ success: false, error: "System doesn't have this customer ID" });
        return;
      }
      res.send({ success: true });
      return;
    }
    catch (e) {
      const ex: Error = e;
      res.send({ success: false, error: "System was unable to sign in the customer" });
    }
  }
  public static add(req: Request, res: Response): void
  {
    try {
      const customer: Customer = Customer.generate(req.body);
      customer.save();
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "System was unable to add the customer"});
    }
  }
  public static remove(req: Request, res: Response): void
  {
    try {
      const customerID: string = req.body.customerID;
      if (!customerID) {
        res.send({ success: false, error: "System didn't recieve a customer ID" });
        return;
      } 
      const customer: Customer = Customer.From.id(customerID);
      customer.delete();
      this.session.remove(customerID);
      res.send({ success: true });
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "System was unable to delete the customer."});
    }
  }
  public static update(req: Request, res: Response): void
  {
    try {
      const customerID: string = req.body.customerID;
      if (!customerID) {
        res.send({ success: false, error: "System didn't recieve a customer ID." });
        return;
      } 
      const customer: Customer = Customer.From.id(customerID);
      customer.update(req.body);
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to update the customer."});
    }
  }
  public static emailPassword(req: Request, res: Response): void
  {
    try {
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "System was unable to email the customer their password" });
    }
  }
}