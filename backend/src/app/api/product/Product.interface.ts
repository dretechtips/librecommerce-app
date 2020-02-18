import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

export interface ProductDOT extends BoxItem {
  name: string;
  features: string[];
  SKU: string;
  UPC: string;
  categoryID: string;
  description: string;
  brand: string;
  directions: string[];
  warning: string;
  ingredients: string[];
  benefits: string[];
  rating: number;
  ratingAmount: number;
  launchDate: Date;
  releaseDate: Date;
  package: number;
  perPackage: number;
  dimension: DimensionSchema;
}
