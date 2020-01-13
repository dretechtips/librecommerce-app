import { NewShippingData } from "./Shipping.interface";

export const NewOrderData = {
  customerID: String,
  cartID: String,
  shipping: NewShippingData
};

export const OrderData = {
  customerID: String,
  shippingID: String,
  cartID: String,
  cancelled: Boolean,
  completed: Boolean,
  cost: Number,
  onHold: Boolean
};
