import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';
import Ban from '../model/Ban';
import BanAppeal from '../model/BanAppeal';
import { Body } from '../interface/Ban.interface';
import { Customer, CustomerManager } from '../model/Customer';
import { IPAddress } from '../type/Location';
import { SFController } from './SpeechFilter.controller';
import { SpeechFilter } from '../model/SpeechFilter';
import { ServerError, ClientError, UserError } from '../type/Error';
import { AppealBody, AppealReview } from '../interface/BanAppeal.interface';
import * as database from 'database';

const filter: SpeechFilter = SFController.import(
  'BAN_REVIEW_AUTOMATION.txt'
).lock();

/**
 *
 *  Your IP Has Been Banned. If you feel like this ban
 *  is wrong you can appeal your case "here"
 *  Case ID: #XXXXXXXXX-XXXXXX-XXXXXX
 *  Reason: EX: More than 3 chargeback attempt
 */
export const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip: string = req.ip;
    const ipAddress: IPAddress = new IPAddress(ip);
    const result: Ban[] | null = Ban.search({ ipAddress: [ipAddress] });
    if (result && result.length > 1) {
      if (req.path === '/ban/appeal') {
        return next();
      }
      res.send();
      return;
    } else {
      return next();
    }
  } catch (e) {
    res.sendError(e, "System couldn't verify your IP Address.");
  }
};

export const add = HttpFunction(
  'POST',
  'System was unable to add the new ban.',
  (req, res) => {
    const banBody: Body = req.body.ban;
    if (!banBody)
      throw new ServerError("System didn't recieve any value to create a ban.");
    const customer: Customer | null = CustomerManager.from.id(
      banBody.customerID
    ) as Customer | null;
    if (!customer)
      throw new ServerError(
        "System couldn't find the customer from the customer ID specified."
      );
    const ban: Ban = customer.ban(banBody.reason);
    ban.add();
  }
);

export const remove = HttpFunction(
  'DELETE',
  'System was unable to remove the ban.',
  (req, res) => {
    const banAppealBody: AppealBody = req.body.banAppeal;
    if (!banAppealBody)
      throw new ServerError(
        "System didn't revieve a ban appeal from the client."
      );
    const banAppeals: BanAppeal[] | null = BanAppeal.search({
      caseID: banAppealBody.caseID
    });
    if (!banAppeals || banAppeals.length === 0)
      throw new ServerError('System was unable to to fetch a ban appeal!');
    if (banAppeals.length > 1)
      throw new ServerError(
        'System has found multiple ban appeals from one case ID.'
      );
    const banAppeal: BanAppeal = banAppeals[0];
    if (!banAppeal.hasResolution())
      throw new UserError(
        "System reviewers hasn't process this ban appeal yet."
      );
    else {
      const result = banAppeal.getResolution();
      if (result === 'reject') {
        return;
      } else if (result === 'resolve') {
        const ban: Ban = banAppeal.getBan();
        ban.revoke();
      }
    }
  }
);

export const appeal = HttpFunction(
  'POST',
  'System was unable to create an appeal.',
  (req, res) => {
    const appeal: AppealBody = req.body.banAppeal;
    if (BanAppeal.search({ caseID: appeal.caseID })) {
      throw new ClientError(`This client has already sent an appeal. 
          Any further attempts to create multiple appeals 
          will lead to a permenant case close to every appeal.`);
    }
    if (!appeal)
      throw new ClientError("Client didn't provide an appeal to the system.");
    const customer: Customer | null = CustomerManager.from.id(
      appeal.ban.customerID
    ) as Customer | null;
    if (!customer)
      throw new Error(
        "System couldn't find any customer from the id specified."
      );
    const ban: Ban[] = Ban.search({ customerID: customer.getID() });
    if (!ban.length)
      throw new Error('This customer has no ban on his account.');
    const banAppeal: BanAppeal = new BanAppeal({
      msg: appeal.message,
      ban: ban[0]
    });
    const isSafe: boolean = filter.isSafe(banAppeal.getMessage());
    if (isSafe) banAppeal.add();
  }
);

export const review = HttpFunction(
  'POST',
  'System cannot process this review on customer ban.',
  (req, res) => {
    const review: AppealReview = req.body.banAppealView;
    if (!review)
      throw new Error("The system didn't recieve the review from the client.");
    const banAppeal: BanAppeal[] = BanAppeal.search({ caseID: review.caseID });
    if (!banAppeal || banAppeal.length === 0)
      throw new Error(
        'System could not find the ban appeal with the case id specified.'
      );
    banAppeal[0].setResolution(review.resolution);
  }
);
