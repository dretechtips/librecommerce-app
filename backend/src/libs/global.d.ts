import { ConsolePlus } from '../model/Console';
import { HttpErrorHandler } from '../helper/HttpErrorHandler';
import Customer from '../model/Customer';
import Shipping from '../model/Shipping';
import Order from '../model/Order';

declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}

declare global {
  const hconsole: ConsolePlus;
  namespace Express {
    interface Request {
      customer: Customer;
      shipping: Shipping;
      order: Order;
    }
  }
}
