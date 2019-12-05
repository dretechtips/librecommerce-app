import { ListItems } from "../List.interface";
import { FormModifier } from "../Form.interface";
import { ProductVariation } from "./Inventory.interface";
import { CreditCard } from "./Billing.interface";
import { Shipping, NewShipping } from "./Shipping.interface";

export interface UnprocessedUIProps {
  halt: UnprocessedUIActions;
  complete: UnprocessedUIActions;
  avaliable: ListItems;
  halted: ListItems;
}

interface UnprocessedUIActions {
  (id: string): void;
}

export interface UnprocessedState {
  avaliable: ListItems;
  halted: ListItems;
  details?: string;
}

export interface Order {
  username: string;
  id: string;
  timestamp: string;
  cancelled: boolean;
  //products: ProductVariation[];
  shipping: Shipping;
  cc: CreditCard;
}

export type NewOrder = Omit<
  Order,
  "timestamp" | "id" | "cancelled" | "shipping"
> & { shipping: NewShipping };
