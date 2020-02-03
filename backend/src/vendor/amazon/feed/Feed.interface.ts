export enum FeedType {
  // Product and Inventory
  PRODUCT = "_POST_PRODUCT_DATA_",
  INVENTORY = "_POST_INVENTORY_AVAILIBILITY_DATA_",
  PRODUCT_OVERRIDE = "_POST_PRODUCT_OVERRIDES_DATA_",
  PRODUCT_PRICING = "_POST_PRODUCT_PRICING_DATA_",
  PRODUCT_IMAGE = "_POST_PRODUCT_IMAGE_DATA_",
  PRODUCT_RELATIONHIP = "_POST_PRODUCT_RELATIONSHIP_DATA_",
  // Order
  ORDER_ACKNOWLEDGEMENT = "_POST_ORDER_ACKNOWLEDGEMENT_DATA_",
  ORDER_ADJUSTMENTS = "_POST_PAYMENT_ADJUSTMENT_DATA_",
  ORDER_FULLFILLMENT = "_POST_ORDER_FULFILLMENT_DATA_",
  INVOICE_CONFIRMATION = "_POST_INVOICE_CONFIRMATION_DATA_"
  // @todo Fullfilled By Amazon
}

export enum FeedAction {
  SUBMIT = "SubmitFeed",
  GETSUBMITRESULT = "GetFeedSubmissionResult",
  GETSUBMITLIST = "GetFeedSubmissionList"
}

export interface FeedSubmit {
  Version: string;
  Action: FeedAction;
  SellerId: string;
  MWSAuthToken: string;
  FeedContent: string;
  FeedType: FeedType;
}
