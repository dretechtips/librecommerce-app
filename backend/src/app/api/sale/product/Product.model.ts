import ModelFactory from "src/app/common/model/Model.factory";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import WeightSchema from "src/app/common/model/schema/Weight.schema";
import { arrayProp, prop } from "@typegoose/typegoose";
import { ProductDOT } from "./Product.interface";
import CostSchema from "../../billing/cost/Cost.schema";

class ProductSchema implements ProductDOT {
  @prop({required: true})
  public cost: CostSchema;

  @prop({ required: true })
  public name: string;
  @arrayProp({ required: true })
  public features: string[];
  @prop({ required: true })
  public SKU: string;
  @prop({ required: true })
  public UPC: string;
  @arrayProp({ required: true })
  public categoryIDs: string[];
  @prop({ required: true })
  public description: string;
  @prop({ required: true })
  public brand: string;
  @arrayProp({ required: true, default: [] })
  public directions: string[];
  @prop({ required: true })
  public warning: string;
  @arrayProp({ required: true })
  public ingredients: string[];
  @arrayProp({ required: true })
  public benefits: string[];
  @prop({ required: true })
  public rating: number;
  @prop({ required: true })
  public ratingAmount: number;
  @prop({ required: true })
  public launchDate: Date;
  @prop({ required: true })
  public releaseDate: Date;
  @prop({ required: true })
  public package: number;
  @prop({ required: true })
  public perPackage: number;
  @prop({ required: true })
  public dimension: DimensionSchema;
  @prop({ required: true })
  public weight: WeightSchema;
}

export class Product extends ModelFactory(ProductSchema) {}

export default Product;
