import Product from "../model/Product";
import * as IProduct from "../interface/Product.interface";

export interface Constructor
{
  items: Product[],
}

export interface Value extends Constructor {
  id: string
}

export interface NewBody
{
  items: string[]
}

export interface ExistingBody {
  items: IProduct.ExistingBody[];
  id: string;
}