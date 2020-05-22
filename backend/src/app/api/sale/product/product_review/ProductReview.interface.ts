export interface ProductReviewDOT {
  /**
   * Product ID
   */
  productID: string;
  /**
   * Review Stars
   * @min 1
   * @max 5
   */
  stars: number;
  /**
   * Review Statement
   */
  statement: string;
}

export interface ProductReviewDependentDOT {
  /**
   * Product Review IDs
   */
  pReviewIDs: string[];
}