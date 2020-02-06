/**
 * Condition
 */

export interface ConditionInfo {
  ConditionType: ConditionType;
  ConditionInfo: string;
}

export enum ConditionType {
  NEW = "New",
  USED_LIKE_NEW = "UsedLikeNew",
  USED_VERY_GOOD = "UsedVeryGood",
  USED_GOOD = "UsedGood",
  USED_ACCEPTABLE = "UsedAcceptable",
  COLLECTIBLE_LIKE_NEW = "CollectibleLikeNew",
  COLLECTIBLE_VERY_GOOD = "CollectibleVeryNew",
  COLLECTIBLE_GOOD = "CollectibleGood",
  COLLECTIBLE_ACCEPTABLE = "CollectibleAcceptable",
  CLUB = "Club"
}

/**
 * StandardProductID
 */

export interface StandardProductID {
  Type: StandardProductIDType;
  Value: string;
}

export enum StandardProductIDType {
  ISPN = "ISPN",
  "UPC",
  "EAN",
  "ASIN",
  "GTIN",
  "GCID",
  "PZN"
}

/**
 * RebateType
 */

export interface RebateType {
  RebateStartDate: string;
  RebateEndDate: string;
  RebateMessage: string;
  RebateName: string;
}
