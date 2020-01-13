import * as Mongoose from "mongoose";

export interface INewShipping {
  days: number;
  provider: string;
}

export interface INewShippingModel extends Mongoose.Document, INewShipping {
  fullName: () => string;
}

export interface IShipping extends INewShipping {
  price: number;
  cancelled: boolean;
}

export interface IShippingModel extends Mongoose.Document, IShipping {}
