import { Product } from "../model/Inventory";
import { ExistingProductBody } from "./Inventory.interface";

export interface CartConstructor
{
  items: Product[],
  id: string,
}

export interface NewCartBody
{
  items: string[]
}

export interface ExistingCartBody {
  items: ExistingProductBody[];
  id: string;
}