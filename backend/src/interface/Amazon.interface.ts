import AmazonMWS = require("amazon-mws");
import { Dimension } from "../type/Dimension";

export interface AmazonProduct {
  sku: string;
  standardProductID: AmazonStandardProductID;
  launchDate?: string;
  discontinueDate?: string;
  releaseDate?: string;
  itemQuantityPackage: number;
  descriptionData: AmazonDescriptionData
}

export interface AmazonStandardProductID {
  type: "UPC",
  val: string
}

export interface AmazonDescriptionData {
  title: string,
  brand: string,
  description: string,
  dimension: Dimension,
  maxOrderQuantity: number,
  legalDisclaimer: string,
  ageWarning: AmazonAgeWarning
}

export enum AmazonAgeWarning {
  under3 = "not_suitable_under_3_years_supervision",
  under4 = "not_suitable_under_4_years_supervision",
  under5 = "not_suitable_under_5_years_supervision",
  under6 = "not_suitable_under_6_years_supervision",
  under7 = "not_suitable_under_7_years_supervision",
  under8 = "not_suitable_under_8_years_supervision",
  under9 = "not_suitable_under_9_years_supervision",
  under10 = "not_suitable_under_10_years_supervision",
  under11 = "not_suitable_under_11_years_supervision",
  under12 = "not_suitable_under_12_years_supervision",
  under13 = "not_suitable_under_13_years_supervision",
  under14 = "not_suitable_under_14_years_supervision",
}

export type AmazonProductType = 
"ClothingAccessories" | "Clothing" | "Miscellaneous" | "CameraPhoto" | "Home" |
"Sports" | ""