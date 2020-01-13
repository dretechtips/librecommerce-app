import { Request, Response, NextFunction } from 'express';
import {
  NewBody,
  ExistingBody,
  ParamStorage
} from '../interface/Shipping.interface';
import { Shipping, ShippingQueue } from '../model/Shipping';
import { ClientError, ServerError } from '../type/Error';
import { HttpFunction } from '../decorator/Http.decorator';
import NamespaceFactory from '../factory/Namespace.factory';


const name = new NamespaceFactory('shipping');

const params: ParamStorage = {
  id: name.new('id')
};

export const get = HttpFunction(
  'System was unable to fetch a shipping',
  (req, res, next) => {
    const id: string = req.param(params.id.string());
    if (!id)
      throw new ClientError(
        'Client did not provide an id to fetch the shipping for param ' +
          params.id.string()
      );
    const shippings: Shipping[] = Shipping.search({ id });
    if (shippings.length !== 1)
      throw new ServerError(
        'Server has found more or less than 1 shippings from 1 id.'
      );
    req.shipping = Shipping.search({ id })[0];
    return next();
  }
);

export const Add = HttpFunction(
  'System was unable to add the shipping.',
  (req, res, next) => {
    const bShipping: NewBody = req.body.shipping;
    const shipping: Shipping = Shipping.generate(bShipping);
    shipping.save();
    return next();
  }
);

export const cancel = HttpFunction(
  'System was unable to delete the shipping.',
  (req, res, next) => {
    req.shipping.update({ cancelled: true });
    return next();
  }
);

export const remove = [
  cancel,
  HttpFunction(
    'System was unable to delete order form the system.',
    (req, res, next) => {
      req.shipping.delete();
      return next();
    }
  )
];

export const getID = HttpFunction(
  'System was unable to get the shipping ID.',
  (req, res, next) => {
    res.send({ success: true, shipping: { id: req.shipping.getID() } });
    return next();
  }
);
