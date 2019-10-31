import { Request, Response, NextFunction } from 'express';
import { InventoryController } from '../controller/Inventory.controller';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';

export const home = HttpFunction(
  'GET',
  'System was unable to render the landing home page.',
  (req, res) => {
    res.render('./landing/home');
  }
);

export const shop = HttpFunction(
  'GET',
  'System was unable to render the landing shopping page.',
  (req, res) => {
    const products: Product[] | void = InventoryController.list(req, res, next);
    if (products)
      res.render('./landing/shop', {
        products: products.map(cur => cur.toPrimitiveObj())
      });
  }
);

export const contact = HttpFunction(
  'GET',
  'System was unable to render the landing content page.',
  (req, res) => {
    res.render('./landing/contact');
  }
);
