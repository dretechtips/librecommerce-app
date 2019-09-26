import { Request, Response, NextFunction } from "express";
import { HttpMethod } from "../decorator/HttpMethod";
import { BanList, Ban, BanAppealList, BanAppeal } from "../model/Ban";
import { BanBody, BanAppealBody, BanAppealReview } from "../interface/Ban.interface";
import { Customer, CustomerManager } from "../model/Customer";
import { IPAddress } from "../type/Location";
import { SFController } from "./SpeechFilter.controller";
import { SpeechFilter } from "../model/SpeechFilter";
import { ClientError, ServerError } from "../model/Error";

export class BanController {
  private static _bans: BanList = new BanList();
  private static _appeals: BanAppealList = new BanAppealList();
  private static _filter: SpeechFilter =
    SFController.import("BAN_REVIEW_AUTOMATION.txt");
  public static Account = class {
    public static add(ban: Ban): void {
      BanController._bans.add(ban);
    }
  }
  public static verify(req: Request, res: Response, next: NextFunction): void {
    try {
      const ip: string = req.ip;
      const ipAddress: IPAddress = new IPAddress(ip);
      const bans: Ban[] = BanController._bans.findFromIP(ipAddress);
      if (!bans.every(cur => cur === null)) {
        // Your IP Has Been Banned. If you feel like this ban
        // is wrong you can appeal your case "here"
        // Case ID: #XXXXXXXXX-XXXXXX-XXXXXX
        // Reason: EX: More than 3 chargeback attempt
        if (req.path === "/ban/appeal") {
          return next();
        }
        res.send();
        return;
      }
      else {
        return next();
      }
    }
    catch (e) {
      res.sendError(e, "System couldn't verify your IP Address.");
    }
  }
  @HttpMethod("POST", "System was unable to add the new ban.")
  public static add(req: Request, res: Response): void {
    const banBody: BanBody = req.body.ban;
    if (!banBody)
      throw new Error("System didn't recieve any value to create a ban.");
    const customer: Customer = CustomerManager.from.id(banBody.customerID);
    if (!customer)
      throw new Error("System couldn't find the customer from the customer ID specified.");
    const ban: Ban = customer.ban(banBody.reason);
    this._bans.add(ban);
  }
  @HttpMethod("DELETE", "System was unable to remove the ban.")
  public static remove(req: Request, res: Response) {
    const banAppealBody: BanAppealBody = req.body.banAppeal;
    if (!banAppealBody)
      throw new ServerError("System didn't revieve a ban appeal from the client.");
    const banAppeal: BanAppeal = this._appeals.find(banAppealBody.caseID);
    if (!banAppeal.hasResolution())
      throw new Error("System reviewers hasn't process this ban appeal yet.");
    else {
      const result = banAppeal.getResolution();
      if (result === "reject") {
        this._appeals.remove(banAppealBody.caseID);
      }
      else if (result === "resolve") {
        const ban: Ban = banAppeal.getBan();
        this._bans.remove(ban.getCustomer());
      }
    }
  }
  @HttpMethod("POST", "System was unable to create an appeal.")
  public static appeal(req: Request, res: Response): void {
    const appeal: BanAppealBody = req.body.banAppeal;
    if (this._appeals.find(appeal.caseID)) {
      throw new ClientError(`This client has already sent an appeal. 
          Any further attempts to create multiple appeals 
          will lead to a permenant case close to every appeal.`);
    }
    if (!appeal) throw new Error("Client didn't provide an appeal to the system.");
    const customer: Customer = CustomerManager.from.id(appeal.customerID);
    if (!customer) throw new Error("System couldn't find any customer from the id specified.");
    const ban: Ban = this._bans.find(customer);
    if (!ban) throw new Error("This customer has no ban on his account.");
    const banAppeal: BanAppeal = new BanAppeal(appeal.message, ban);
    const isSafe: boolean = this._filter.isSafe(banAppeal.getMessage());
    if(isSafe)
      this._appeals.add(banAppeal);
  }
  @HttpMethod("POST", "System cannot process this review on customer ban.")
  public static review(req: Request, res: Response): void {
    const review: BanAppealReview = req.body.banAppealView;
    if (!review) throw new Error("The system didn't recieve the review from the client.");
    const banAppeal: BanAppeal = this._appeals.find(review.caseID);
    if (!banAppeal) throw new Error("System could not find the ban appeal with the case id specified.");
    banAppeal.setResolution(review.resolution);
  }
}