import { ProductSelectionDOT } from "../product/Product.interface";

export interface PromoDOT extends ProductSelectionDOT {
  /**
   * When does this promotion start?
   */
  start: Date;
  /**
   * When does this promotion end?
   */
  end: Date;
  /**
   * Redemption code
   * @returns If this returns null or blank then this promtion doesn't require a redemption
   */
  code: string;
  /**
   * Discount off the price it being applied to
   */
  discount: number;
  /**
   * Max amount of items this promotion can be used on
   * @default -1 No Max
   */
  max: number;
  /**
   * Min amount of items this promotion can be used on
   * @default -1 No Min
   */
  min: number;
}
