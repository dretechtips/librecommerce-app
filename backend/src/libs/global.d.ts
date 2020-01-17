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
