import Shipping from "src/app/api/shipping/Shipping.model";

export interface ShippingPartner {
  isShippingAvailible(shipping: Shipping): Promise<boolean>;
}
