import { Product } from "../model/Inventory";

type cartID = string;

export interface CartConstructor
{
  items: Product[],
  id?: string,
}

export interface NewCartBody
{
  items: cartID[]
}