import { Request, Response, NextFunction } from 'express';
import Cart from '../model/Cart';
import CartSession from '../model/CartSession';
import Product from '../model/Product';
import { OrdersController } from './Orders.controller';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';
import { ExistingBody } from '../interface/Cart.interface';
import { ClientError, ServerError } from '../type/Error';
import * as IProduct from '../interface/Product.interface';

const session: CartSession = new CartSession();

export const create = HttpFunction(
  'POST',
  'System was unable to create a cart.',
  (req, res) => {
    const cart: Cart = Cart.generate(req.body);
    session.add(cart);
    return res.cookie('cartID', cart.id());
  }
);

export const verify = HttpFunction(
  'ALL',
  'System was unable to verify the cart session.',
  (req, res, next) => {
    if (!req.cookies.cartID) {
      req.method = 'POST';

      create(req, res);
      return next();
    } else {
      const cart: Cart = session.find(req.cookies.cartID);
      if (!cart) {
        res = create(req, res);
        return next();
      }
    }
  }
);

export const checkout = HttpFunction(
  'POST',
  'System was unable to checkout your order',
  (req, res, next) => {
    session.remove(req.cookies.cartID);
    res.clearCookie('cartID');
    OrdersController.add(req, res);
    return;
  }
);

export const listProducts = HttpFunction(
  'GET',
  'System was unable to list the items in the cart.',
  (req, res) => {
    const cartID: string = req.cookies.cartID;
    if (!cartID)
      throw new ClientError('Unable to find the cart ID in the cookies.');
    const cart = session.find(cartID);
    if (!cart)
      throw new ServerError('Unable to find the cart from the cart ID.');
    const products: Product[] = cart.getProducts();
    const productBody: IProduct.ExistingBody[] = products.map(cur =>
      cur.toPrimitiveObj()
    );
    res.send({ success: true, products: productBody });
    return;
  }
);

export const search = HttpFunction(
  'GET',
  'System was unable to find any cart at all.',
  (req, res) => {
    const carts: Cart[] = session.getAll();
    const cartsBody: ExistingBody[] = carts.map(cur => cur.toPrimObj());
    res.send({ success: true, carts: cartsBody });
  }
);
