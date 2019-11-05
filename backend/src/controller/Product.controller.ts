import { NewBody, Value } from "../interface/Product.interface";
import { HttpFunction } from "../decorator/Http.decorator";
import Product from "../model/Product";

export const get = HttpFunction(
  "The system was unable to get the product",
  (req, res, next) => {
    const { id }: Pick<Value, "id"> = req.body.product;
    const products: Product[] = Product.search({ id });
    req.product = products[0];
    return next();
  }
);

export const add = HttpFunction(
  "The system was unable to add the product to the inventory.",
  (req, res, next) => {
    const body: NewBody = req.body.product;
    const product: Product = Product.generate(body);
    product.add();
    return next();
  }
);

export const remove = [
  get,
  HttpFunction(
    "The system was unable to delete the product to the inventory.",
    (req, res, next) => {
      req.product.remove();
      return next();
    }
  )
];

export const update = [
  get,
  HttpFunction(
    "The system was unable to update the product to the inventory.",
    (req, res, next) => {
      const body: Value = req.body.product;
      req.product.update(body);
      return next();
    }
  )
];
