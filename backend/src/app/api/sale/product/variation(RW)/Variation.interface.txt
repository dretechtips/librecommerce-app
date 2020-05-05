import { Transactable } from "../../../billing/transaction/Transaction.interface";
import { Packable } from "../../shipping/packer/Packer.interface";

export interface VariationDOT extends Packable, Transactable {
  name: string;
  productID: string;
  images: string[];
  size: string;
  color: string;
  stock: number;
}
