import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

export interface VariationDOT {
  name: string;
  productID: string;
  price: number;
  images: string[];
  size: string;
  color: string;
  stock: number;
}
