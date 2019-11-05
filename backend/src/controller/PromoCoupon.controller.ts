import { Request, Response } from 'express';
import uuid = require('uuid/v4');
import { Discount } from '../type/Discount';
import { DateRange } from '../type/Range';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import Promo from '../model/Promo';
import PromoCoupon from '../model/PromoCoupon';
import { ClientError } from '../type/Error';
import {
  Constructor,
  NewBody,
  ExistingBody
} from '../interface/PromoCoupon.interface';

declare global {
  namespace Express {
    interface Request {
      coupon: PromoCoupon;
    }
  }
}

export const get = HttpFunction(
  'System was unable to get a coupon',
  (req, res, next) => {
    const { id } = req.body.promo as Pick<ExistingBody, 'id'>;
    const promo: PromoCoupon = PromoCoupon.search({ id });
    req.coupon = promo;
    return next();
  }
);

export const add = HttpFunction(
  'System was unable to add a new coupon.',
  (req, res) => {
    const body: NewBody = req.body.promo;
    const promo: PromoCoupon = PromoCoupon.generate(body);
    promo.add();
  }
);

export const update = [
  get,
  HttpFunction('System was unable to update a coupon.', (req, res) => {
    req.coupon.update(req.body.promo);
  })
];

export const remove = [
  get,
  HttpFunction('System was unable to delete a coupon.', (req, res) => {
    req.coupon.delete();
  })
];
