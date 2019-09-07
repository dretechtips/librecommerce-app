import { Product } from "../model/Inventory";

export interface CartConstructor
{
  items: Product[],
  id?: string,
}

export interface NewCartBody
{
  items: string[]
}