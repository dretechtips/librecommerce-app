import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import Ban from '../model/Ban';
import BanAppeal from '../model/BanAppeal';
import { NewBody, ExistingBody } from '../interface/Ban.interface';
import Customer from '../model/Customer';
import { IPAddress } from '../type/Location';
import { SFController } from './SpeechFilter.controller';
import { SpeechFilter } from '../model/SpeechFilter';
import { ServerError, ClientError, UserError } from '../type/Error';
import { AppealBody, AppealReview } from '../interface/BanAppeal.interface';
import e = require('express');

declare global {
  namespace Express {
    interface Request {
      ban: Ban;
      banAppeal: BanAppeal;
    }
  }
}

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
export const verify = HttpFunction(
  'System was unable to verify if this ip address.',
  (req, res, next) => {
    const ip: string = req.ip;
    const ipAddress: IPAddress = new IPAddress(ip);
    const result: Ban[] = Ban.search({ ipAddress: [ipAddress] });
    if (result && result.length > 1) {
      if (req.path === '/ban/appeal') {
        return next();
      }
      res.send();
      return;
    } else {
      return next();
    }
  }
);

export const get = HttpFunction(
  'System was unable to get the ban',
  (req, res, next) => {
    const { id }: Pick<ExistingBody, 'id'> = req.body.ban;
    const ban: Ban[] = Ban.search({ id });
    if (ban.length !== 1)
      throw new ServerError('There is only one ban for every id.');
    req.ban = ban[0];
    return next();
  }
);

export const getAppeal = HttpFunction(
  'System was unable to get the ban appeal.',
  (req, res, next) => {
    const { id }: Pick<AppealBody, 'id'> = req.body.banAppeal;
    const appeal: BanAppeal[] = BanAppeal.search({ id });
    if (appeal.length !== 1)
      throw new ServerError(
        'The is only suppose to be one ban appeal for every id.'
      );
    req.banAppeal = appeal[0];
    return next();
  }
);

export const getCustomer = HttpFunction(
  'System was unable to find the customer',
  (req, res, next) => {
    if (req.ban) req.customer = req.ban.getAccount() as Customer;
    else if (req.banAppeal)
      req.customer = req.banAppeal.getAccount() as Customer;
    next();
  }
);

export const add = HttpFunction(
  'System was unable to add the new ban.',
  (req, res, next) => {
    const banBody: NewBody = req.body.ban;
    if (!banBody)
      throw new ServerError("System didn't recieve any value to create a ban.");
    const ban: Ban = req.customer.ban(banBody.reason);
    ban.add();
    return next();
  }
);

export const remove = [
  getAppeal,
  HttpFunction('System was unable to remove the ban.', (req, res, next) => {
    if (!req.banAppeal.hasResolution())
      throw new UserError(
        "System reviewers hasn't process this ban appeal yet."
      );
    else {
      const result = req.banAppeal.getResolution();
      if (result === 'reject') {
        return;
      } else if (result === 'resolve') {
        const ban: Ban = req.banAppeal.getBan();
        ban.revoke();
      }
    }
    return next();
  })
];

export const sendAppeal = [
  get,
  getCustomer,
  HttpFunction('System was unable to create an appeal.', (req, res, next) => {
    const appeal: AppealBody = req.body.banAppeal;
    if (BanAppeal.search({ id: appeal.id })) {
      throw new ClientError(`This client has already sent an appeal. 
          Any further attempts to create multiple appeals 
          will lead to a permenant case close to every appeal.`);
    }
    const ban: Ban[] = Ban.search({ customerID: req.customer.getID() });
    const banAppeal: BanAppeal = new BanAppeal({
      msg: appeal.message,
      ban: ban[0]
    });
    const isSafe: boolean = filter.isSafe(banAppeal.getMessage());
    if (isSafe) banAppeal.add();
    return next();
  })
];

export const review = HttpFunction(
  'System cannot process this review on customer ban.',
  (req, res) => {
    const review: AppealReview = req.body.banAppeal.review;
    const banAppeal: BanAppeal[] = BanAppeal.search({ id: review.id });
    banAppeal[0].setResolution(review.resolution);
  }
);
