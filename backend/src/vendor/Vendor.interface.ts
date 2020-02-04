import Shipping from "src/api/shipping/Shipping.model";

export interface ShippingPartner {
  isShippingAvailible(shipping: Shipping): Promise<boolean>;
}
