import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import Product from "./Product.model";
import { Transactable } from "../../billing/transaction/Transaction.interface";

export interface ProductDOT extends Transactable {
  /**
   * Product Display Name
   */
  name: string;
  /**
   * Product Key Display Features
   */
  features: string[];
  /**
   * Stock Keeping Unit For Internal Use
   */
  SKU: string;
  /**
   * Universal Product Code For External Use
   */
  UPC: string;
  /**
   * Product Category Ids for Tag based Idenfication
   */
  categoryIDs: string[];
  /**
   * Product Display Description
   */
  description: string;
  /**
   * Product Branding
   */
  brand: string;
  /**
   * How to use product in incremental steps
   */
  directions: string[];
  /**
   * Federal warning hazards
   */
  warning: string;
  /**
   * Ingredients used within the products
   */
  ingredients: string[];
  /**
   * Product Marketing Benefits
   */
  benefits: string[];
  /**
   * 1 - 5 Star Rating
   */
  rating: number;
  /**
   * Amount of people who rated this product
   */
  ratingAmount: number;
  /**
   * When does this product get launched?
   */
  launchDate: Date;
  /**
   * When does this product get released?
   */
  releaseDate: Date;
  /**
   * How many package does this product require?
   */
  package: number;
  /**
   * How many individual item are in each package?
   */
  perPackage: number;
  /**
   * Product Dimensions
   * @see DimensionSchema
   */
  dimension: DimensionSchema;
}

export interface ProductSelectionDOT {
  /**
   * Product IDs
   */
  pIDs: string[];
  /**
   * Product Category IDs
   */
  pcIDs: string[];
  /**
   * Select all products?
   */
  all: boolean;
}

