import { Request, Response } from 'express';
import uuid = require('uuid/v4');
import { Discount } from '../type/Discount';
import { DateRange } from '../type/Range';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';
import Promo from '../model/Promo';
import PromoCoupon from '../model/PromoCoupon';
import { ClientError } from '../type/Error';
import {
  Constructor,
  NewBody,
  ExistingBody
} from '../interface/PromoCoupon.interface';

export const add = HttpFunction(
  'POST',
  'System was unable to add a new coupon.',
  (req, res) => {
    const body: NewBody = req.body.promo;
    const promo: PromoCoupon = PromoCoupon.generate(body);
    promo.add();
  }
);

export const update = HttpFunction(
  'PATCH',
  'System was unable to update a coupon.',
  (req, res) => {
    const { id } = req.body.promo as Pick<ExistingBody, 'id'>;
    const promo: PromoCoupon = PromoCoupon.search({ id });
    promo.update(req.body.promo);
  }
);

export const remove = HttpFunction(
  'DELETE',
  'System was unable to delete a coupon.',
  (req, res) => {
    const { id } = req.body.promo as Pick<ExistingBody, 'id'>;
    const promo: PromoCoupon = PromoCoupon.search({ id });
    promo.delete();
  }
);
