import { EmailAddress, PhoneNum, Address } from "../type/Location";
import { IShipping } from "./Shipping.interface";
import { Shipping } from "../model/Shipping";
import { IPAddress } from "../type/Location";
import { Money } from "../type/Money";
import { AddressConstructor } from "./Location.interface";

export namespace IOrder {
  export interface Constructor {
    id: string,
    timestamp: Date,
    products: Product[],
    address: Address,
    cancelled: boolean,
    shipping: Shipping,
    ipAddress: IPAddress,
    cost: Money,
    complete: boolean
  }
  export interface NewBody {
    id: string,
    products: Product[],
    address: AddressConstructor,
    shipping: IShipping.NewBody,
  }
  export interface ExistingBody extends NewBody {
    address: AddressConstructor,
    timestamp: string,
    cancelled: boolean,
    ipAddress: string,
    totalCost: number,
    shipping: IShipping.ExistingBody
  }
  export interface Product {
    id: string,
    quantity: number,
  }
}