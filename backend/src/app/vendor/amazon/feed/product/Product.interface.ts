import {
  ConditionInfo,
  StandardProductID,
  RebateType
} from "../../core/base/Base.interface";

/**
 * @todo Add Product Data
 * - FoodAndBeverage
 * - Health
 * - Miscallaneous
 */
interface __placeholder {}

export interface ProductInfo {
  SKU: string;
  StandardProductID: StandardProductID;
  ProductTaxCode: string;
  LaunchDate: string;
  ReleaseDate: string;
  Condition: ConditionInfo;
  Rebate?: RebateType;
  ItemPackageQuantity: number;
  NumberOfItems: number;
  DescriptionData: ProductDescriptionData;
  ProductData: {};
}

export interface ProductDescriptionData {
  Title: string;
  Brand: string;
  Description: string;
  // @todo ItemDimension
  ItemDimensions: string;
  MSRP: number;
  MaxOrderQuantity: number;
  Prop65: string;
  LegalDisclaimer: string;
  Manufacturer: string;
  SearchTerms: string;
  RecommendedBrowseNode: string;
  UsedFor: string;
  ItemType: string;
  TargetAudience: string;
  IsGiftWrapAvailable: boolean;
  IsGiftMessageAvailable: boolean;
}
