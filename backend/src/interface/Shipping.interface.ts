import * as Mongoose from "mongoose";

export interface ShippingData {
  days: number;
  provider: string;
  price: number;
  cancelled: string;
}

// export interface INewShipping {
//   days: number;
//   provider: string;
// }

// export interface INewShippingModel extends Mongoose.Document, INewShipping {
//   setDays: (days: number) => void;
// }

// export interface IShipping extends INewShipping {
//   price: number;
//   cancelled: boolean;
// }

// export interface IShippingModel extends Mongoose.Document, IShipping {}
