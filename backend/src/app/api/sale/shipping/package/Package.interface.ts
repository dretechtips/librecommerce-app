import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import WeightSchema from "src/app/common/model/schema/Weight.schema";

export interface PackageDOT {
  productIDs: string[];
  totalWeight: WeightSchema;
  dimension: DimensionSchema;
}
