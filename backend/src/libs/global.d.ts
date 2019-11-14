import { ConsolePlus } from '../helper/Console';
import { HttpErrorHandler } from '../helper/HttpErrorHandler';
import Customer from '../model/Customer';
import Shipping from '../model/Shipping';
import Order from '../model/Order';
import Product from '../model/Product';
import Model from '../model/Model';

declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}

declare global {
  const hconsole: ConsolePlus;
  export namespace Express {
    interface Request {
      customer: Customer;
      shipping: Shipping;
      order: typeof Model;
      product: Product;
    }
  }
}
