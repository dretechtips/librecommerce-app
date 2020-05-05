import { PromoDOT } from "./Promo.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, prop } from "@typegoose/typegoose";

export class PromoSchema implements PromoDOT {
  @arrayProp({ required: true })
  public pIDs: string[];
  @arrayProp({ required: true })
  public pcIDs: string[];
  @prop({ required: true })
  public all: boolean;
  @prop({ required: true })
  public start: Date;
  @prop({ required: true })
  public end: Date;
  @prop({ required: true })
  public code: string;
  @prop({ required: true })
  public discount: number;
  @prop({ required: true, default: -1 })
  public max: number;
  @prop({ required: true, default: -1 })
  public min: number;

  /**
   * Gets true discount
   * @param price Product Price
   */
  public getTrueDiscount(price: number): number {
    return 0;
  }
  /**
   * Get the price after discount
   * @param price Product Price
   */
  public applyDiscount(price: number): number {
    return price - this.getTrueDiscount(price);
  }
  /**
   * Checks if the promo can apply a discount to the product
   * @param productID Product ID
   * @param categoryIDs Product Category IDs
   */
  public hasDiscount(productID: string, categoryIDs: string[]): boolean {
    return (
      this.all ||
      this.pIDs.indexOf(productID) != -1 ||
      categoryIDs
        .map((category) => this.pcIDs.includes(category))
        .indexOf(true) != -1
    );
  }
}

export class Promo extends ModelFactory(PromoSchema) {}

export default Promo;
