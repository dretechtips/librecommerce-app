import { Request, Response, NextFunction, RequestHandler } from 'express';
import Cart from '../model/Cart';
import Controller from "../factory/Controller";

export const controller = new Controller("cart", Cart);

/**
 * Creates a new cart from client data
 */
export const Create = function (): RequestHandler {
  return controller.create();
}

export const GetCart = HttpFunction(
  'System was unable to get the cart',
  (req, res, next) => {
    const cartID: string = req.cookies.cartID;
    if (!cartID)
      throw new ClientError('Unable to find the cart ID in the cookies.');
    const cart = session.find(cartID);
    if (!cart)
      throw new ServerError('Unable to find the cart from the cart ID.');
    res.locals.cart = cart.getProducts().forEach(product => product.toPrimObj());
    return next(),
  }
);

export const create = HttpFunction(
  'System was unable to create a cart.',
  (req, res, next) => {
    const cart: Cart = Cart.generate(req.body);
    session.add(cart);
    res.cookie('cartID', cart.id());
    return next();
  }
);

export const verify = HttpFunction(
  'System was unable to verify the cart session.',
  (req, res, next) => {
    if (!req.cookies.cartID) {
      return create(req, res, next);
    } else {
      const cart: Cart = session.find(req.cookies.cartID);
      if (!cart) {
        create(req, res, next);
        return create(req, res, next);
      }
    }
    return next();
  }
);

export const checkout = [
  getSelf,
  HttpFunction('System was unable to checkout your order', (req, res, next) => {
    session.remove(req.cookies.cartID);
    req.cart;
    res.clearCookie('cartID');
    return next();
  })
];

export const listProducts = [
  getSelf,
  HttpFunction(
    'System was unable to list the items in the cart.',
    (req, res) => {
      const products: ProductVariation[] = req.cart.getProducts();
      const productBody: IProduct.ExistingBody[] = products.map(cur =>
        cur.toPrimitiveObj()
      );
      res.send({ success: true, products: productBody });
      return;
    }
  )
];

export const search = HttpFunction(
  'System was unable to find any cart at all.',
  (req, res) => {
    const carts: Cart[] = session.getAll();
    const cartsBody: ExistingBody[] = carts.map(cur => cur.toPrimObj());
    res.send({ success: true, carts: cartsBody });
  }
);
