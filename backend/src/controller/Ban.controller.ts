import { Request, Response } from "express-serve-static-core";
import { HttpMethod } from "../decorator/HttpMethod";
import { BanList, Ban, BanAppealList } from "../model/Ban";
import { Customer } from "../model/Customer";
import { CustomerConstructor } from "../interface/Customer.interface";
import { IPAddress } from "../type/Location";

class BanController {
  private static _bans = new BanList();
  private static _appeals = new BanAppealList();
  @HttpMethod("POST")
  public static add(req: Request, res: Response) {
    const customer: Customer = Customer.From.id(req.body.customerID);
    const customerData: CustomerConstructor = customer.getValue();
    const associatedIP: IPAddress[] = customerData.associatedIP;
    for (let i = 0; i < associatedIP.length; i++) {
      const ban: Ban = new Ban(
        customerData.firstName,
        customerData.lastName,
        customerData.email,
        associatedIP[i]);
      this._bans.add(ban);
    }
  }
  @HttpMethod("DELETE")
  public static remove(req: Request, res: Response) {
    const caseID: string = req.body.caseID;
    c
  }
  @HttpMethod("POST")
  public static appeal(req: Request, res: Response) {
    
  }
  @HttpMethod("PATCH")
  public static update(req: Request, res: Response) {
    
  }
}